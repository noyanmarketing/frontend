import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


@pytest.fixture(autouse=True)
def configure_test_settings(settings):
    """Configure DRF settings for tests."""
    # Disable throttling and use custom pagination for tests
    settings.REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework_simplejwt.authentication.JWTAuthentication',
            'rest_framework.authentication.SessionAuthentication',
        ],
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        ],
        'DEFAULT_PAGINATION_CLASS': 'apps.core.pagination.StandardResultsPagination',
        'PAGE_SIZE': 20,
        'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
        # Throttling disabled for tests
        'DEFAULT_THROTTLE_CLASSES': [],
        'DEFAULT_THROTTLE_RATES': {},
    }
    yield


@pytest.fixture
def api_client():
    """API client for tests."""
    return APIClient()


@pytest.fixture
def user(db):
    return User.objects.create_user(
        email='test@example.com', password='testpass123', first_name='Test', last_name='User'
    )


@pytest.fixture
def authenticated_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client
