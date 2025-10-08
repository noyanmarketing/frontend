from rest_framework import permissions, viewsets

from .models import CartItem, Order
from .serializers import CartItemSerializer, OrderSerializer


class CartItemViewSet(viewsets.ModelViewSet):
    """Cart item viewset."""

    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    """Order viewset (read-only stub)."""

    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
