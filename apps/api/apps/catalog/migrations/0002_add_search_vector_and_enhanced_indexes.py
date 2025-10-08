# Generated migration for enhanced product search and indexing

import django.contrib.postgres.indexes
import django.contrib.postgres.search
from django.db import migrations, models

import apps.catalog.models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        # Add search_vector field to Product
        migrations.AddField(
            model_name='product',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(blank=True, null=True),
        ),
        # Add validator to attributes field
        migrations.AlterField(
            model_name='product',
            name='attributes',
            field=models.JSONField(
                blank=True,
                default=dict,
                validators=[apps.catalog.models.validate_product_attributes],
            ),
        ),
        # Add db_index to existing fields
        migrations.AlterField(
            model_name='product',
            name='title',
            field=models.CharField(db_index=True, max_length=300),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(db_index=True, decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='is_active',
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(db_index=True, unique=True),
        ),
        # Note: Skipping removal of old indexes as they may not exist in fresh installations
        # The new indexes will supersede them anyway
        # Add new composite indexes
        migrations.AddIndex(
            model_name='product',
            index=models.Index(fields=['is_active', '-created_at'], name='product_active_created_idx'),
        ),
        migrations.AddIndex(
            model_name='product',
            index=models.Index(fields=['is_active', 'price'], name='product_active_price_idx'),
        ),
        migrations.AddIndex(
            model_name='product',
            index=models.Index(
                fields=['category', 'is_active', '-created_at'], name='product_cat_active_created_idx'
            ),
        ),
        migrations.AddIndex(
            model_name='product',
            index=models.Index(
                fields=['brand', 'is_active', '-created_at'], name='product_brand_active_created_idx'
            ),
        ),
        migrations.AddIndex(
            model_name='product',
            index=models.Index(
                fields=['category', 'brand', 'is_active'], name='product_cat_brand_active_idx'
            ),
        ),
        # Add GIN indexes for full-text search and JSON
        migrations.AddIndex(
            model_name='product',
            index=django.contrib.postgres.indexes.GinIndex(
                fields=['search_vector'], name='product_search_gin_idx'
            ),
        ),
        migrations.AddIndex(
            model_name='product',
            index=django.contrib.postgres.indexes.GinIndex(
                fields=['attributes'], name='product_attributes_gin_idx'
            ),
        ),
        # Add category tree traversal index
        migrations.AddIndex(
            model_name='category',
            index=models.Index(fields=['parent', 'name'], name='category_parent_name_idx'),
        ),
    ]
