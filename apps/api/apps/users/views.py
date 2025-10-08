"""Authentication views with HTTP-only cookie support."""

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.cache import cache
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    permission_classes,
    throttle_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    ChangePasswordSerializer,
    LoginSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    RegisterSerializer,
    UserSerializer,
)
from .throttles import (
    LoginRateThrottle,
    PasswordResetRateThrottle,
    RegisterRateThrottle,
)

User = get_user_model()


def set_auth_cookies(response, refresh_token, access_token):
    """Set HTTP-only cookies for authentication."""
    from django.conf import settings

    # Use secure cookies only in production
    is_secure = not settings.DEBUG

    # Access token - expires in 1 hour
    response.set_cookie(
        key='access_token',
        value=access_token,
        httponly=True,
        secure=is_secure,  # HTTPS only in production
        samesite='Lax',
        max_age=3600,  # 1 hour
    )
    # Refresh token - expires in 7 days
    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        httponly=True,
        secure=is_secure,
        samesite='Lax',
        max_age=604800,  # 7 days
    )


def clear_auth_cookies(response):
    """Clear authentication cookies."""
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')


def check_login_lockout(email):
    """Check if user is locked out due to too many failed attempts."""
    cache_key = f'login_attempts:{email}'
    attempts = cache.get(cache_key, 0)
    if attempts >= 5:
        return True, "Account temporarily locked due to too many failed login attempts. Try again in 15 minutes."
    return False, None


def record_failed_login(email):
    """Record a failed login attempt."""
    cache_key = f'login_attempts:{email}'
    attempts = cache.get(cache_key, 0)
    cache.set(cache_key, attempts + 1, timeout=900)  # 15 minutes


def clear_login_attempts(email):
    """Clear failed login attempts on successful login."""
    cache_key = f'login_attempts:{email}'
    cache.delete(cache_key)


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([RegisterRateThrottle])
def register(request):
    """
    Register a new user.

    Returns HTTP-only cookies with access and refresh tokens.
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                'user': UserSerializer(user).data,
                'message': 'Registration successful',
            },
            status=status.HTTP_201_CREATED,
        )

        set_auth_cookies(response, str(refresh), str(refresh.access_token))
        return response

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([LoginRateThrottle])
def login(request):
    """
    Login a user.

    Returns HTTP-only cookies with access and refresh tokens.
    Implements simple lockout after 5 failed attempts (15-minute lockout).
    """
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    password = serializer.validated_data['password']

    # Check lockout
    is_locked, lockout_message = check_login_lockout(email)
    if is_locked:
        return Response(
            {'error': lockout_message},
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )

    # Authenticate
    user = authenticate(email=email, password=password)

    if user:
        if not user.is_active:
            return Response(
                {'error': 'Account is inactive'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Clear failed attempts
        clear_login_attempts(email)

        # Generate tokens
        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                'user': UserSerializer(user).data,
                'message': 'Login successful',
            }
        )

        set_auth_cookies(response, str(refresh), str(refresh.access_token))
        return response

    # Record failed attempt
    record_failed_login(email)

    return Response(
        {'error': 'Invalid credentials'},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout a user.

    Clears HTTP-only cookies and blacklists refresh token.
    """
    try:
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
    except (TokenError, AttributeError):
        pass  # Token already invalid or blacklisting not enabled

    response = Response({'message': 'Logged out successfully'})
    clear_auth_cookies(response)
    return response


@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    """
    Refresh access token using refresh token from cookie.

    Returns new access token in HTTP-only cookie.
    """
    refresh_token_str = request.COOKIES.get('refresh_token')

    if not refresh_token_str:
        return Response(
            {'error': 'Refresh token not found'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        refresh = RefreshToken(refresh_token_str)
        new_access_token = str(refresh.access_token)

        response = Response({'message': 'Token refreshed successfully'})

        # Set new access token cookie
        from django.conf import settings
        is_secure = not settings.DEBUG

        response.set_cookie(
            key='access_token',
            value=new_access_token,
            httponly=True,
            secure=is_secure,
            samesite='Lax',
            max_age=3600,
        )

        return response
    except TokenError:
        response = Response(
            {'error': 'Invalid refresh token'},
            status=status.HTTP_401_UNAUTHORIZED
        )
        clear_auth_cookies(response)
        return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    """Get current authenticated user info."""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([PasswordResetRateThrottle])
def password_reset_request(request):
    """
    Request password reset.

    Sends password reset email (stub - just generates token).
    """
    serializer = PasswordResetRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']

    try:
        user = User.objects.get(email=email, is_active=True)

        # Generate reset token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Store token in cache for 1 hour
        cache_key = f'password_reset:{uid}:{token}'
        cache.set(cache_key, user.pk, timeout=3600)

        # In production, send email with reset link
        # For now, return token for testing
        reset_link = f"http://localhost:3000/auth/password-reset/confirm?uid={uid}&token={token}"

        return Response({
            'message': 'Password reset email sent',
            'reset_link': reset_link,  # Remove in production
        })
    except User.DoesNotExist:
        # Don't reveal if email exists
        return Response({
            'message': 'If that email exists, a password reset link has been sent'
        })


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    """
    Confirm password reset with token.

    Validates token and sets new password.
    """
    serializer = PasswordResetConfirmSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    token = request.data.get('token')
    uid = request.data.get('uid')

    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id)

        # Verify token from cache
        cache_key = f'password_reset:{uid}:{token}'
        cached_user_id = cache.get(cache_key)

        if not cached_user_id or int(cached_user_id) != user.pk:
            return Response(
                {'error': 'Invalid or expired reset token'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Set new password
        user.set_password(serializer.validated_data['password'])
        user.save()

        # Clear token from cache
        cache.delete(cache_key)

        return Response({'message': 'Password reset successful'})

    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response(
            {'error': 'Invalid reset token'},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_email(request):
    """
    Verify email address (stub).

    In production, this would verify email confirmation tokens.
    """
    return Response({
        'message': 'Email verification endpoint (stub)'
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Change password for authenticated user."""
    serializer = ChangePasswordSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = request.user

    # Verify old password
    if not user.check_password(serializer.validated_data['old_password']):
        return Response(
            {'old_password': 'Incorrect password'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Set new password
    user.set_password(serializer.validated_data['new_password'])
    user.save()

    return Response({'message': 'Password changed successfully'})
