from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from django.db.models import Q
from django_filters import rest_framework as django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Brand, Category, Product
from .serializers import (
    BrandSerializer,
    CategorySerializer,
    ProductDetailSerializer,
    ProductListSerializer,
)


class ProductFilter(django_filters.FilterSet):
    """
    Advanced product filtering with price range and attribute queries.

    Supported filters:
    - category: Category slug
    - brand: Brand slug
    - min_price: Minimum price
    - max_price: Maximum price
    - in_stock: Boolean filter for stock availability
    - color: Filter by color attribute
    - material: Filter by material attribute
    - size: Filter by size attribute
    """

    category = django_filters.CharFilter(field_name='category__slug', lookup_expr='iexact')
    brand = django_filters.CharFilter(field_name='brand__slug', lookup_expr='iexact')
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    in_stock = django_filters.BooleanFilter(method='filter_in_stock')

    # Attribute filters (JSON field queries)
    color = django_filters.CharFilter(method='filter_color')
    material = django_filters.CharFilter(method='filter_material')
    size = django_filters.CharFilter(method='filter_size')

    class Meta:
        model = Product
        fields = ['category', 'brand', 'min_price', 'max_price', 'in_stock', 'color', 'material', 'size']

    def filter_in_stock(self, queryset, name, value):
        """Filter products by stock availability."""
        if value:
            return queryset.filter(stock__gt=0)
        return queryset.filter(stock=0)

    def filter_color(self, queryset, name, value):
        """Filter by color attribute in JSON field."""
        return queryset.filter(attributes__color__icontains=value)

    def filter_material(self, queryset, name, value):
        """Filter by material attribute in JSON field."""
        return queryset.filter(attributes__material__icontains=value)

    def filter_size(self, queryset, name, value):
        """Filter by size attribute in JSON field."""
        return queryset.filter(attributes__size__iexact=value)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Category viewset with tree hierarchy support.

    Endpoints:
    - GET /categories/ - List all categories
    - GET /categories/{slug}/ - Get category details
    - GET /categories/{slug}/children/ - Get child categories
    - GET /categories/{slug}/products/ - Get products in category
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def children(self, request, slug=None):
        """Get all child categories of this category."""
        category = self.get_object()
        children = category.children.all()
        serializer = self.get_serializer(children, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def products(self, request, slug=None):
        """Get all products in this category."""
        category = self.get_object()
        products = Product.objects.filter(
            category=category, is_active=True
        ).select_related('brand', 'category')
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)


class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Brand viewset.

    Endpoints:
    - GET /brands/ - List all brands
    - GET /brands/{slug}/ - Get brand details
    - GET /brands/{slug}/products/ - Get products by brand
    """

    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def products(self, request, slug=None):
        """Get all products by this brand."""
        brand = self.get_object()
        products = Product.objects.filter(
            brand=brand, is_active=True
        ).select_related('brand', 'category')
        serializer = ProductListSerializer(products, many=True)
        return Response(serializer.data)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Advanced product viewset with filtering, search, sorting, and pagination.

    Query parameters:
    - category: Filter by category slug
    - brand: Filter by brand slug
    - min_price: Minimum price filter
    - max_price: Maximum price filter
    - in_stock: Filter by stock availability (true/false)
    - color: Filter by color attribute
    - material: Filter by material attribute
    - size: Filter by size attribute
    - q: Full-text search query (searches title, description, SKU)
    - ordering: Sort by field (price, -price, created_at, -created_at)
    - page: Page number for pagination
    - page_size: Number of items per page

    Examples:
    - /products/?category=electronics&brand=tech-inc
    - /products/?min_price=100&max_price=500
    - /products/?color=blue&in_stock=true
    - /products/?q=wireless+headphones
    - /products/?ordering=-price&page=2
    """

    # Base queryset for router registration
    queryset = Product.objects.filter(is_active=True).select_related(
        'brand', 'category'
    ).prefetch_related('media')

    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['title', 'description', 'sku']
    ordering_fields = ['price', 'created_at', 'title']
    ordering = ['-created_at']

    def get_queryset(self):
        """
        Get optimized queryset with select_related and prefetch_related.
        Applies full-text search if 'q' parameter is provided.
        """
        queryset = super().get_queryset()

        # Full-text search using Postgres search vectors
        search_query = self.request.query_params.get('q', None)
        if search_query:
            # Use search_vector if it exists, otherwise create on-the-fly
            search_vector = SearchVector('title', weight='A') + \
                           SearchVector('description', weight='B') + \
                           SearchVector('sku', weight='C')

            query = SearchQuery(search_query)
            queryset = queryset.annotate(
                rank=SearchRank(search_vector, query)
            ).filter(
                Q(search_vector=query) |
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(sku__icontains=search_query)
            ).order_by('-rank', '-created_at')

        return queryset

    def get_serializer_class(self):
        """Use detailed serializer for single product, list serializer for collections."""
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
