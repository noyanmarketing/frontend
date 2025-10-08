import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
def test_create_user():
    """Test creating a regular user."""
    user = User.objects.create_user(
        email='test@example.com', password='testpass123', first_name='Test'
    )
    assert user.email == 'test@example.com'
    assert user.check_password('testpass123')
    assert not user.is_staff
    assert not user.is_superuser


@pytest.mark.django_db
def test_create_superuser():
    """Test creating a superuser."""
    user = User.objects.create_superuser(email='admin@example.com', password='admin123')
    assert user.is_staff
    assert user.is_superuser


@pytest.mark.django_db
def test_register_endpoint(api_client):
    """Test user registration endpoint."""
    data = {
        'email': 'newuser@example.com',
        'password': 'TestPass123!',
        'password_confirm': 'TestPass123!',
        'first_name': 'New',
        'last_name': 'User',
    }
    response = api_client.post('/api/v1/auth/register/', data)
    assert response.status_code == 201
    assert 'user' in response.data
    assert User.objects.filter(email='newuser@example.com').exists()
