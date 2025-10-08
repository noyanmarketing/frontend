"""Custom throttle classes for authentication endpoints."""

from rest_framework.throttling import AnonRateThrottle


class LoginRateThrottle(AnonRateThrottle):
    """Throttle for login attempts - 5 per minute."""
    rate = '5/min'


class RegisterRateThrottle(AnonRateThrottle):
    """Throttle for registration attempts - 3 per hour."""
    rate = '3/hour'


class PasswordResetRateThrottle(AnonRateThrottle):
    """Throttle for password reset requests - 3 per hour."""
    rate = '3/hour'
