from django.contrib import admin
from django.utils.html import format_html

from .models import Brand, Category, Media, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Enhanced Category admin with tree structure support."""

    list_display = ['name', 'slug', 'parent', 'level_display', 'product_count', 'created_at']
    list_filter = ['parent', 'created_at']
    search_fields = ['name', 'slug', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'parent', 'description')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def level_display(self, obj):
        """Display category level with indentation."""
        indent = '—' * obj.level
        return format_html('{} {}', indent, obj.level)
    level_display.short_description = 'Level'

    def product_count(self, obj):
        """Show number of products in category."""
        count = obj.products.count()
        return format_html('<b>{}</b>', count) if count > 0 else '0'
    product_count.short_description = 'Products'


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    """Enhanced Brand admin with product tracking."""

    list_display = ['name', 'slug', 'product_count', 'logo_preview', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'slug', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at', 'logo_preview']
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'description')
        }),
        ('Media', {
            'fields': ('logo_url', 'logo_preview')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def product_count(self, obj):
        """Show number of products for brand."""
        count = obj.products.count()
        return format_html('<b>{}</b>', count) if count > 0 else '0'
    product_count.short_description = 'Products'

    def logo_preview(self, obj):
        """Show logo preview if available."""
        if obj.logo_url:
            return format_html(
                '<img src="{}" style="max-height: 50px; max-width: 100px;" />',
                obj.logo_url
            )
        return 'No logo'
    logo_preview.short_description = 'Logo Preview'


class MediaInline(admin.TabularInline):
    """Inline media management for products."""

    model = Media
    extra = 1
    fields = ['url', 'alt_text', 'order', 'preview']
    readonly_fields = ['preview']

    def preview(self, obj):
        """Show media preview."""
        if obj.url:
            return format_html(
                '<img src="{}" style="max-height: 50px; max-width: 100px;" />',
                obj.url
            )
        return 'No preview'
    preview.short_description = 'Preview'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Enhanced Product admin with rich features."""

    list_display = [
        'title', 'sku', 'price_display', 'stock_display',
        'brand', 'category', 'is_active_display', 'created_at'
    ]
    list_filter = ['is_active', 'brand', 'category', 'created_at']
    search_fields = ['title', 'sku', 'description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at', 'in_stock']
    inlines = [MediaInline]

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'sku', 'description')
        }),
        ('Pricing & Inventory', {
            'fields': ('price', 'currency', 'stock', 'in_stock')
        }),
        ('Categorization', {
            'fields': ('brand', 'category')
        }),
        ('Attributes', {
            'fields': ('attributes',),
            'description': 'Additional product attributes in JSON format'
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def price_display(self, obj):
        """Display price with currency."""
        return f'{obj.currency} {obj.price}'
    price_display.short_description = 'Price'
    price_display.admin_order_field = 'price'

    def stock_display(self, obj):
        """Display stock with color coding."""
        if obj.stock == 0:
            color = 'red'
            text = 'Out of Stock'
        elif obj.stock < 10:
            color = 'orange'
            text = f'{obj.stock} (Low)'
        else:
            color = 'green'
            text = str(obj.stock)
        return format_html(
            '<span style="color: {}; font-weight: bold;">{}</span>',
            color, text
        )
    stock_display.short_description = 'Stock'
    stock_display.admin_order_field = 'stock'

    def is_active_display(self, obj):
        """Display active status with icon."""
        if obj.is_active:
            return format_html(
                '<span style="color: green;">✓ Active</span>'
            )
        return format_html(
            '<span style="color: red;">✗ Inactive</span>'
        )
    is_active_display.short_description = 'Status'
    is_active_display.admin_order_field = 'is_active'

    actions = ['make_active', 'make_inactive']

    def make_active(self, request, queryset):
        """Bulk activate products."""
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} products marked as active.')
    make_active.short_description = 'Mark selected products as active'

    def make_inactive(self, request, queryset):
        """Bulk deactivate products."""
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} products marked as inactive.')
    make_inactive.short_description = 'Mark selected products as inactive'
