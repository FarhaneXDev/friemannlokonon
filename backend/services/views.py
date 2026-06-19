from rest_framework.generics import (
    ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated
from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(ListAPIView):
    serializer_class = ServiceSerializer
    queryset = Service.objects.filter(is_active=True)


class ServiceAdminListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all().order_by("order")


class ServiceAdminDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    lookup_field = "id"
