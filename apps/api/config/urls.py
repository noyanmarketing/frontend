"""
URL configuration for noyan project.
"""

from django.contrib import admin
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


def health_check(request):
    """Health check endpoint for Docker/K8s - no rate limiting"""
    return JsonResponse({'status': 'healthy'})


def home_redirect(request):
    """Redirect root URL to API documentation"""
    return redirect('swagger-ui')


urlpatterns = [
    path('', home_redirect, name='home'),
    path('health/', health_check, name='health'),
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.users.urls')),
    path('api/v1/', include('apps.catalog.urls')),
    path('api/v1/', include('apps.orders.urls')),
    # OpenAPI schema
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # Swagger UI
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
