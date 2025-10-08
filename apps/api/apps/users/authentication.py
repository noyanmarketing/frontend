"""Custom JWT authentication from HTTP-only cookies."""

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken


class CookieJWTAuthentication(JWTAuthentication):
    """
    Custom JWT authentication that reads access token from HTTP-only cookies.

    Falls back to header-based authentication if no cookie is present.
    """

    def authenticate(self, request):
        # Try to get token from cookie first
        access_token = request.COOKIES.get('access_token')

        if access_token:
            try:
                validated_token = self.get_validated_token(access_token)
                return self.get_user(validated_token), validated_token
            except InvalidToken:
                # Token in cookie is invalid, try header
                pass

        # Fall back to header-based authentication
        return super().authenticate(request)
