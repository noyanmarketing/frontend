from django.urls import path

from . import views

urlpatterns = [
    # Authentication
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/refresh/', views.refresh_token, name='refresh'),
    path('auth/me/', views.me, name='me'),

    # Password management
    path('auth/password/reset/', views.password_reset_request, name='password_reset_request'),
    path('auth/password/reset/confirm/', views.password_reset_confirm, name='password_reset_confirm'),
    path('auth/password/change/', views.change_password, name='change_password'),

    # Email verification (stub)
    path('auth/verify-email/', views.verify_email, name='verify_email'),
]
