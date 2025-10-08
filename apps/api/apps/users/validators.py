"""Password validators for strong password policy."""

import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


class MinimumLengthValidator:
    """Validate that password has minimum length."""

    def __init__(self, min_length=8):
        self.min_length = min_length

    def validate(self, password, user=None):
        if len(password) < self.min_length:
            raise ValidationError(
                _("This password must contain at least %(min_length)d characters."),
                code='password_too_short',
                params={'min_length': self.min_length},
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least %(min_length)d characters."
            % {'min_length': self.min_length}
        )


class UppercaseValidator:
    """Validate that password contains at least one uppercase letter."""

    def validate(self, password, user=None):
        if not re.search(r'[A-Z]', password):
            raise ValidationError(
                _("Password must contain at least one uppercase letter."),
                code='password_no_upper',
            )

    def get_help_text(self):
        return _("Your password must contain at least one uppercase letter.")


class LowercaseValidator:
    """Validate that password contains at least one lowercase letter."""

    def validate(self, password, user=None):
        if not re.search(r'[a-z]', password):
            raise ValidationError(
                _("Password must contain at least one lowercase letter."),
                code='password_no_lower',
            )

    def get_help_text(self):
        return _("Your password must contain at least one lowercase letter.")


class NumberValidator:
    """Validate that password contains at least one digit."""

    def validate(self, password, user=None):
        if not re.search(r'\d', password):
            raise ValidationError(
                _("Password must contain at least one digit."),
                code='password_no_number',
            )

    def get_help_text(self):
        return _("Your password must contain at least one digit.")


class SpecialCharacterValidator:
    """Validate that password contains at least one special character."""

    def validate(self, password, user=None):
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError(
                _("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)."),
                code='password_no_special',
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)."
        )


class WeakPasswordValidator:
    """Validate that password is not a common weak password."""

    WEAK_PASSWORDS = [
        'password', 'password123', '12345678', 'qwerty', 'abc123',
        'letmein', 'welcome', 'monkey', '1234567890', 'password1',
        'admin', 'root', 'user', 'test', 'guest', 'demo',
    ]

    def validate(self, password, user=None):
        if password.lower() in self.WEAK_PASSWORDS:
            raise ValidationError(
                _("This password is too common and weak."),
                code='password_too_common',
            )

    def get_help_text(self):
        return _("Your password can't be a commonly used password.")
