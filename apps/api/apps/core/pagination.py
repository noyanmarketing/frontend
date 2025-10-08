"""Custom pagination classes for the API."""

from rest_framework.pagination import PageNumberPagination


class StandardResultsPagination(PageNumberPagination):
    """Standard pagination with configurable page size."""

    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100  # Allow up to 100 items per page
