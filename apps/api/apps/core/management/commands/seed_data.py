import random

from django.core.management.base import BaseCommand

from apps.catalog.models import Brand, Category, Product


class Command(BaseCommand):
    help = 'Seed database with sample data (50 products with attributes)'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')

        # Create category tree hierarchy
        electronics = Category.objects.get_or_create(
            slug='electronics', defaults={'name': 'Electronics', 'parent': None}
        )[0]
        laptops = Category.objects.get_or_create(
            slug='laptops', defaults={'name': 'Laptops', 'parent': electronics}
        )[0]
        phones = Category.objects.get_or_create(
            slug='phones', defaults={'name': 'Phones', 'parent': electronics}
        )[0]
        audio = Category.objects.get_or_create(
            slug='audio', defaults={'name': 'Audio', 'parent': electronics}
        )[0]

        fashion = Category.objects.get_or_create(
            slug='fashion', defaults={'name': 'Fashion', 'parent': None}
        )[0]
        mens_fashion = Category.objects.get_or_create(
            slug='mens-fashion', defaults={'name': "Men's Fashion", 'parent': fashion}
        )[0]
        womens_fashion = Category.objects.get_or_create(
            slug='womens-fashion', defaults={'name': "Women's Fashion", 'parent': fashion}
        )[0]

        home = Category.objects.get_or_create(
            slug='home', defaults={'name': 'Home & Living', 'parent': None}
        )[0]
        furniture = Category.objects.get_or_create(
            slug='furniture', defaults={'name': 'Furniture', 'parent': home}
        )[0]
        Category.objects.get_or_create(
            slug='decor', defaults={'name': 'Decor', 'parent': home}
        )

        # Create brands
        tech_inc = Brand.objects.get_or_create(
            slug='tech-inc', defaults={'name': 'Tech Inc', 'description': 'Leading technology brand'}
        )[0]
        fashion_co = Brand.objects.get_or_create(
            slug='fashion-co', defaults={'name': 'Fashion Co', 'description': 'Premium fashion brand'}
        )[0]
        luxury_brand = Brand.objects.get_or_create(
            slug='luxury-brand',
            defaults={'name': 'Luxury Brand', 'description': 'Luxury lifestyle brand'},
        )[0]
        urban_style = Brand.objects.get_or_create(
            slug='urban-style',
            defaults={'name': 'Urban Style', 'description': 'Modern urban fashion'},
        )[0]
        home_essentials = Brand.objects.get_or_create(
            slug='home-essentials',
            defaults={'name': 'Home Essentials', 'description': 'Quality home products'},
        )[0]

        # Clear existing products
        Product.objects.all().delete()

        # Product generation data
        colors = ['Black', 'White', 'Blue', 'Red', 'Gray', 'Silver', 'Navy Blue', 'Green', 'Brown']
        materials_electronic = ['Aluminum', 'Plastic', 'Metal', 'Glass']
        materials_fashion = ['Cotton', 'Polyester', 'Leather', 'Silk', 'Wool']
        materials_home = ['Wood', 'Metal', 'Fabric', 'Ceramic', 'Glass']
        sizes = ['XS', 'S', 'M', 'L', 'XL']

        laptop_models = [
            'MacBook Pro 16', 'Dell XPS 15', 'ThinkPad X1', 'HP Spectre', 'Surface Laptop',
            'ASUS ZenBook', 'Acer Swift', 'LG Gram', 'Razer Blade', 'MSI Prestige'
        ]

        phone_models = [
            'iPhone 15 Pro', 'Samsung Galaxy S24', 'Pixel 8', 'OnePlus 11', 'Xiaomi 13',
            'Oppo Find X6', 'Vivo X90', 'Sony Xperia', 'Motorola Edge', 'Nothing Phone'
        ]

        audio_products = [
            'Wireless Headphones', 'Bluetooth Speaker', 'Gaming Headset', 'Earbuds Pro',
            'Studio Monitor', 'Sound Bar', 'Portable Speaker', 'DJ Headphones', 'In-Ear Monitors'
        ]

        fashion_items_men = [
            'Classic Denim Jeans', 'Cotton T-Shirt', 'Leather Jacket', 'Wool Sweater',
            'Dress Shirt', 'Chino Pants', 'Bomber Jacket', 'Hoodie', 'Polo Shirt'
        ]

        fashion_items_women = [
            'Summer Dress', 'Silk Blouse', 'Denim Skirt', 'Cashmere Cardigan',
            'Evening Gown', 'Blazer', 'Trench Coat', 'Wide Leg Pants', 'Knit Sweater'
        ]

        created_count = 0

        # Generate 10 laptops
        for i, model in enumerate(laptop_models):
            Product.objects.create(
                title=model,
                slug=f'laptop-{i+1}',
                sku=f'LAPTOP-{str(i+1).zfill(3)}',
                description=f'High-performance {model} with latest processor and stunning display',
                price=round(random.uniform(999, 2999), 2),
                stock=random.randint(5, 50),
                brand=tech_inc,
                category=laptops,
                attributes={
                    'color': random.choice(colors[:3]),
                    'material': random.choice(materials_electronic),
                    'dimensions': {'width': 35, 'height': 24, 'depth': 1.6, 'unit': 'cm'},
                    'weight': {'value': random.randint(1500, 2500), 'unit': 'g'},
                    'screen_size': random.choice(['14 inch', '15 inch', '16 inch']),
                },
            )
            created_count += 1

        # Generate 10 phones
        for i, model in enumerate(phone_models):
            Product.objects.create(
                title=model,
                slug=f'phone-{i+1}',
                sku=f'PHONE-{str(i+1).zfill(3)}',
                description=f'Latest {model} with advanced camera and 5G connectivity',
                price=round(random.uniform(599, 1499), 2),
                stock=random.randint(10, 100),
                brand=tech_inc,
                category=phones,
                attributes={
                    'color': random.choice(colors),
                    'material': random.choice(materials_electronic),
                    'dimensions': {'width': 7.5, 'height': 15, 'depth': 0.8, 'unit': 'cm'},
                    'weight': {'value': random.randint(150, 250), 'unit': 'g'},
                    'storage': random.choice(['128GB', '256GB', '512GB']),
                },
            )
            created_count += 1

        # Generate 9 audio products
        for i, product in enumerate(audio_products):
            Product.objects.create(
                title=product,
                slug=f'audio-{i+1}',
                sku=f'AUDIO-{str(i+1).zfill(3)}',
                description=f'Premium {product} with exceptional sound quality',
                price=round(random.uniform(99, 499), 2),
                stock=random.randint(20, 150),
                brand=tech_inc,
                category=audio,
                attributes={
                    'color': random.choice(colors),
                    'material': random.choice(materials_electronic),
                    'dimensions': {'width': 20, 'height': 8, 'depth': 5, 'unit': 'cm'},
                    'weight': {'value': random.randint(200, 800), 'unit': 'g'},
                },
            )
            created_count += 1

        # Generate 9 men's fashion items
        for i, item in enumerate(fashion_items_men):
            Product.objects.create(
                title=item,
                slug=f'mens-{i+1}',
                sku=f'MENF-{str(i+1).zfill(3)}',
                description=f'Stylish {item} perfect for any occasion',
                price=round(random.uniform(49, 299), 2),
                stock=random.randint(15, 80),
                brand=random.choice([fashion_co, urban_style]),
                category=mens_fashion,
                attributes={
                    'color': random.choice(colors),
                    'material': random.choice(materials_fashion),
                    'size': random.choice(sizes),
                    'care_instructions': 'Machine wash cold',
                },
            )
            created_count += 1

        # Generate 4 more products to reach 50
        furniture_items = ['Modern Sofa', 'Wooden Bookshelf', 'Ergonomic Office Chair', 'Glass Coffee Table']

        for i, item in enumerate(furniture_items):
            Product.objects.create(
                title=item,
                slug=f'furniture-{i+1}',
                sku=f'FURN-{str(i+1).zfill(3)}',
                description=f'Beautiful {item} for your home',
                price=round(random.uniform(199, 999), 2),
                stock=random.randint(5, 30),
                brand=random.choice([luxury_brand, home_essentials]),
                category=furniture,
                attributes={
                    'color': random.choice(colors),
                    'material': random.choice(materials_home),
                    'dimensions': {'width': 180, 'height': 85, 'depth': 90, 'unit': 'cm'},
                    'weight': {'value': random.randint(15000, 50000), 'unit': 'g'},
                },
            )
            created_count += 1

        # Generate 8 women's fashion items
        for i, item in enumerate(fashion_items_women[:8]):
            Product.objects.create(
                title=item,
                slug=f'womens-{i+1}',
                sku=f'WOMF-{str(i+1).zfill(3)}',
                description=f'Elegant {item} with modern style',
                price=round(random.uniform(59, 399), 2),
                stock=random.randint(10, 70),
                brand=random.choice([fashion_co, luxury_brand]),
                category=womens_fashion,
                attributes={
                    'color': random.choice(colors),
                    'material': random.choice(materials_fashion),
                    'size': random.choice(sizes),
                    'care_instructions': 'Dry clean only',
                },
            )
            created_count += 1

        self.stdout.write(self.style.SUCCESS(f'✓ Created {created_count} products'))
        self.stdout.write(self.style.SUCCESS(f'✓ Created {Category.objects.count()} categories'))
        self.stdout.write(self.style.SUCCESS(f'✓ Created {Brand.objects.count()} brands'))
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
