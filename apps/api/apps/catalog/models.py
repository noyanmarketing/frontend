from django.contrib.postgres.indexes import GinIndex
from django.contrib.postgres.search import SearchVectorField
from django.core.exceptions import ValidationError
from django.db import models

from apps.core.models import TimeStampedModel


def validate_product_attributes(value):
    """
    Validate product attributes JSON schema.

    Expected structure:
    {
        "color": "Red",
        "material": "Cotton",
        "dimensions": {"width": 10, "height": 20, "depth": 5, "unit": "cm"},
        "weight": {"value": 500, "unit": "g"},
        "size": "M"
    }
    """
    if not isinstance(value, dict):
        raise ValidationError("Attributes must be a JSON object")

    # Validate dimensions if present
    if "dimensions" in value:
        dims = value["dimensions"]
        if not isinstance(dims, dict):
            raise ValidationError("Dimensions must be an object")
        required_dim_fields = ["width", "height", "depth", "unit"]
        for field in required_dim_fields:
            if field not in dims:
                raise ValidationError(f"Dimensions missing required field: {field}")

    # Validate weight if present
    if "weight" in value:
        weight = value["weight"]
        if not isinstance(weight, dict):
            raise ValidationError("Weight must be an object")
        if "value" not in weight or "unit" not in weight:
            raise ValidationError("Weight must have 'value' and 'unit' fields")


class Category(TimeStampedModel):
    """
    Product category model with self-referencing tree structure.

    Example hierarchy:
    - Electronics (parent=None)
      - Laptops (parent=Electronics)
        - Gaming Laptops (parent=Laptops)
      - Phones (parent=Electronics)
    - Fashion (parent=None)
      - Men's Fashion (parent=Fashion)
      - Women's Fashion (parent=Fashion)
    """

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, db_index=True)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True, related_name='children'
    )
    description = models.TextField(blank=True)

    class Meta:
        db_table = 'categories'
        verbose_name_plural = 'categories'
        ordering = ['name']
        indexes = [
            models.Index(fields=['parent', 'name']),  # For tree traversal
        ]

    def __str__(self):
        return self.name

    def get_ancestors(self):
        """Get all ancestor categories (parent, grandparent, etc.)."""
        ancestors = []
        current = self.parent
        while current:
            ancestors.append(current)
            current = current.parent
        return ancestors

    def get_descendants(self):
        """Get all descendant categories (children, grandchildren, etc.)."""
        descendants = list(self.children.all())
        for child in self.children.all():
            descendants.extend(child.get_descendants())
        return descendants

    @property
    def is_root(self):
        """Check if this is a root category."""
        return self.parent is None

    @property
    def level(self):
        """Get the depth level of this category in the tree."""
        return len(self.get_ancestors())


class Brand(TimeStampedModel):
    """Brand model."""

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    logo_url = models.URLField(blank=True)

    class Meta:
        db_table = 'brands'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(TimeStampedModel):
    """
    Product model with enhanced attributes and full-text search.

    Attributes JSON schema example:
    {
        "color": "Navy Blue",
        "material": "100% Organic Cotton",
        "dimensions": {"width": 45, "height": 70, "depth": 2, "unit": "cm"},
        "weight": {"value": 350, "unit": "g"},
        "size": "L",
        "care_instructions": "Machine wash cold"
    }
    """

    title = models.CharField(max_length=300, db_index=True)
    slug = models.SlugField(unique=True, db_index=True)
    sku = models.CharField(max_length=100, unique=True, db_index=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
    currency = models.CharField(max_length=3, default='USD')
    stock = models.IntegerField(default=0)
    brand = models.ForeignKey(
        Brand, on_delete=models.SET_NULL, null=True, related_name='products', db_index=True
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products',
        db_index=True,
    )
    attributes = models.JSONField(
        default=dict, blank=True, validators=[validate_product_attributes]
    )
    is_active = models.BooleanField(default=True, db_index=True)

    # Full-text search vector field
    search_vector = SearchVectorField(null=True, blank=True)

    class Meta:
        db_table = 'products'
        ordering = ['-created_at']
        indexes = [
            # Composite indexes for common query patterns
            models.Index(fields=['is_active', '-created_at']),
            models.Index(fields=['is_active', 'price']),
            models.Index(fields=['category', 'is_active', '-created_at']),
            models.Index(fields=['brand', 'is_active', '-created_at']),
            models.Index(fields=['category', 'brand', 'is_active']),
            # GIN index for full-text search
            GinIndex(fields=['search_vector'], name='product_search_gin_idx'),
            # GIN index for JSON attributes (enables faster JSON queries)
            GinIndex(fields=['attributes'], name='product_attributes_gin_idx'),
        ]

    def __str__(self):
        return self.title

    @property
    def in_stock(self):
        """Check if product is in stock."""
        return self.stock > 0

    def get_attribute(self, key, default=None):
        """Get a specific attribute value."""
        return self.attributes.get(key, default)

    def set_attribute(self, key, value):
        """Set a specific attribute value."""
        self.attributes[key] = value


class Media(TimeStampedModel):
    """Product media (images, videos) model."""

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='media')
    url = models.URLField()
    alt_text = models.CharField(max_length=200, blank=True)
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        db_table = 'product_media'
        verbose_name_plural = 'media'
        ordering = ['order', 'created_at']

    def __str__(self):
        return f'{self.product.title} - Media {self.order}'
