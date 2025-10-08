"""Performance tests for product catalog APIs."""

import time

import pytest

from apps.catalog.models import Brand, Category, Product


@pytest.mark.django_db
def test_product_list_performance(api_client):
    """Test product list endpoint performance (<200ms target)."""
    # Setup: Create test data
    brand = Brand.objects.create(name='TestBrand', slug='testbrand')
    category = Category.objects.create(name='TestCategory', slug='testcategory')

    # Create 50 products
    products = [
        Product(
            title=f'Product {i}',
            slug=f'product-{i}',
            sku=f'PROD-{str(i).zfill(3)}',
            description=f'Description for product {i}',
            price=99.99 + i,
            stock=10 * i,
            brand=brand,
            category=category,
            attributes={'color': 'Blue', 'size': 'M'},
        )
        for i in range(50)
    ]
    Product.objects.bulk_create(products)

    # Test: Measure response time
    start_time = time.time()
    response = api_client.get('/api/v1/products/')
    end_time = time.time()

    response_time_ms = (end_time - start_time) * 1000

    # Assert: Response should be successful and fast
    assert response.status_code == 200
    assert response_time_ms < 200, f"Response time {response_time_ms:.2f}ms exceeds 200ms target"
    assert len(response.data['results']) > 0


@pytest.mark.django_db
def test_product_filtered_by_category_performance(api_client):
    """Test product filtering by category performance."""
    # Setup
    brand = Brand.objects.create(name='TestBrand', slug='testbrand')
    category1 = Category.objects.create(name='Category1', slug='category1')
    category2 = Category.objects.create(name='Category2', slug='category2')

    # Create products in different categories
    for i in range(25):
        Product.objects.create(
            title=f'Product Cat1 {i}',
            slug=f'product-cat1-{i}',
            sku=f'CAT1-{str(i).zfill(3)}',
            description='Description',
            price=100,
            brand=brand,
            category=category1,
        )
        Product.objects.create(
            title=f'Product Cat2 {i}',
            slug=f'product-cat2-{i}',
            sku=f'CAT2-{str(i).zfill(3)}',
            description='Description',
            price=100,
            brand=brand,
            category=category2,
        )

    # Test
    start_time = time.time()
    response = api_client.get('/api/v1/products/?category=category1&page_size=50')
    end_time = time.time()

    response_time_ms = (end_time - start_time) * 1000

    # Assert
    assert response.status_code == 200
    assert response_time_ms < 200, f"Filtered query took {response_time_ms:.2f}ms (target: <200ms)"
    assert len(response.data['results']) == 25
    assert response.data['count'] == 25  # Total count should be 25


@pytest.mark.django_db
def test_product_search_performance(api_client):
    """Test full-text search performance."""
    # Setup
    brand = Brand.objects.create(name='TestBrand', slug='testbrand')
    category = Category.objects.create(name='Electronics', slug='electronics')

    # Create diverse products for search testing
    search_products = [
        ('Wireless Headphones Premium', 'wireless-headphones-premium'),
        ('Bluetooth Speaker Portable', 'bluetooth-speaker-portable'),
        ('Wireless Earbuds Pro', 'wireless-earbuds-pro'),
        ('Gaming Headset Wireless', 'gaming-headset-wireless'),
    ]

    for i, (title, slug) in enumerate(search_products):
        Product.objects.create(
            title=title,
            slug=slug,
            sku=f'SEARCH-{str(i).zfill(3)}',
            description=f'High-quality {title.lower()} with advanced features',
            price=99.99,
            brand=brand,
            category=category,
        )

    # Add 20 more products that don't match the search
    for i in range(20):
        Product.objects.create(
            title=f'Different Product {i}',
            slug=f'different-product-{i}',
            sku=f'DIFF-{str(i).zfill(3)}',
            description='Other type of product',
            price=50,
            brand=brand,
            category=category,
        )

    # Test
    start_time = time.time()
    response = api_client.get('/api/v1/products/?q=wireless')
    end_time = time.time()

    response_time_ms = (end_time - start_time) * 1000

    # Assert
    assert response.status_code == 200
    assert response_time_ms < 200, f"Search query took {response_time_ms:.2f}ms (target: <200ms)"
    assert len(response.data['results']) == 3  # Three products with "wireless" in title


@pytest.mark.django_db
def test_product_complex_filter_performance(api_client):
    """Test complex filtering with multiple parameters."""
    # Setup
    brand1 = Brand.objects.create(name='Brand1', slug='brand1')
    brand2 = Brand.objects.create(name='Brand2', slug='brand2')
    category = Category.objects.create(name='Fashion', slug='fashion')

    # Create products with varying prices and attributes
    for i in range(30):
        Product.objects.create(
            title=f'T-Shirt {i}',
            slug=f't-shirt-{i}',
            sku=f'SHIRT-{str(i).zfill(3)}',
            description='Comfortable t-shirt',
            price=25.00 + (i * 5),  # Prices from $25 to $170
            stock=10 if i % 2 == 0 else 0,  # Half in stock, half out of stock
            brand=brand1 if i % 2 == 0 else brand2,
            category=category,
            attributes={'color': 'Blue' if i % 3 == 0 else 'Red', 'size': 'M'},
        )

    # Test: Complex filter (category + brand + price range + in_stock)
    start_time = time.time()
    response = api_client.get(
        '/api/v1/products/?category=fashion&brand=brand1&min_price=50&max_price=100&in_stock=true'
    )
    end_time = time.time()

    response_time_ms = (end_time - start_time) * 1000

    # Assert
    assert response.status_code == 200
    assert response_time_ms < 200, f"Complex filter took {response_time_ms:.2f}ms (target: <200ms)"
    # All returned products should match the filters
    for product in response.data['results']:
        assert 50 <= float(product['price']) <= 100


@pytest.mark.django_db
def test_product_pagination_performance(api_client):
    """Test pagination performance."""
    # Setup
    brand = Brand.objects.create(name='TestBrand', slug='testbrand')
    category = Category.objects.create(name='TestCat', slug='testcat')

    # Create 100 products
    products = [
        Product(
            title=f'Product {i}',
            slug=f'product-page-{i}',
            sku=f'PAGE-{str(i).zfill(3)}',
            description='Description',
            price=50,
            brand=brand,
            category=category,
        )
        for i in range(100)
    ]
    Product.objects.bulk_create(products)

    # Test: Request page 2 with custom page size
    start_time = time.time()
    response = api_client.get('/api/v1/products/?page=2&page_size=20')
    end_time = time.time()

    response_time_ms = (end_time - start_time) * 1000

    # Assert
    assert response.status_code == 200
    assert response_time_ms < 200, f"Paginated query took {response_time_ms:.2f}ms (target: <200ms)"
    assert 'results' in response.data
    assert 'count' in response.data  # Total count should be present
