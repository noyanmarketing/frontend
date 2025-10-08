from rest_framework import serializers

from .models import CartItem, Order


class CartItemSerializer(serializers.ModelSerializer):
    """Cart item serializer."""

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'created_at']


class OrderSerializer(serializers.ModelSerializer):
    """Order serializer."""

    class Meta:
        model = Order
        fields = ['id', 'order_number', 'status', 'total_amount', 'currency', 'created_at']
