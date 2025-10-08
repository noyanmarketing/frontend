import pytest

from apps.catalog.models import Brand, Category, Product


@pytest.mark.django_db
def test_category_creation():
    """Test creating a category."""
    category = Category.objects.create(name='Electronics', slug='electronics')
    assert str(category) == 'Electronics'
    assert category.slug == 'electronics'


@pytest.mark.django_db
def test_brand_creation():
    """Test creating a brand."""
    brand = Brand.objects.create(name='TechBrand', slug='techbrand')
    assert str(brand) == 'TechBrand'


@pytest.mark.django_db
def test_product_creation():
    """Test creating a product."""
    brand = Brand.objects.create(name='TestBrand', slug='testbrand')
    category = Category.objects.create(name='TestCategory', slug='testcategory')
    product = Product.objects.create(
        title='Test Product',
        slug='test-product',
        sku='TEST-001',
        description='Test description',
        price=99.99,
        stock=10,
        brand=brand,
        category=category,
    )
    assert str(product) == 'Test Product'
    assert product.in_stock is True
    assert product.price == 99.99


@pytest.mark.django_db
def test_products_list_endpoint(api_client):
    """Test products list endpoint with pagination."""
    brand = Brand.objects.create(name='TestBrand', slug='testbrand')
    Product.objects.create(
        title='Product 1',
        slug='product-1',
        sku='PROD-001',
        description='Description',
        price=99.99,
        brand=brand,
    )
    response = api_client.get('/api/v1/products/')
    assert response.status_code == 200
    assert 'results' in response.data
    assert 'count' in response.data
    assert len(response.data['results']) == 1
    assert response.data['results'][0]['title'] == 'Product 1'


@pytest.mark.django_db
def test_product_detail_endpoint(api_client):
    """Test product detail endpoint."""
    brand = Brand.objects.create(name='TestBrand', slug='testbrand')
    product = Product.objects.create(
        title='Product Detail',
        slug='product-detail',
        sku='PROD-002',
        description='Detailed description',
        price=149.99,
        brand=brand,
    )
    response = api_client.get(f'/api/v1/products/{product.slug}/')
    assert response.status_code == 200
    assert response.data['title'] == 'Product Detail'
    assert response.data['sku'] == 'PROD-002'
