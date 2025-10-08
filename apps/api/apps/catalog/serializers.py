from rest_framework import serializers

from .models import Brand, Category, Media, Product


class MediaSerializer(serializers.ModelSerializer):
    """Media serializer."""

    class Meta:
        model = Media
        fields = ['id', 'url', 'alt_text', 'width', 'height', 'order']


class CategorySerializer(serializers.ModelSerializer):
    """Category serializer."""

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'description', 'created_at']


class BrandSerializer(serializers.ModelSerializer):
    """Brand serializer."""

    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'description', 'logo_url', 'created_at']


class ProductListSerializer(serializers.ModelSerializer):
    """Product list serializer (minimal fields)."""

    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'slug',
            'price',
            'currency',
            'brand',
            'category',
            'in_stock',
            'created_at',
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Product detail serializer (full fields)."""

    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    media = MediaSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'title',
            'slug',
            'sku',
            'description',
            'price',
            'currency',
            'stock',
            'brand',
            'category',
            'attributes',
            'media',
            'in_stock',
            'created_at',
            'updated_at',
        ]
