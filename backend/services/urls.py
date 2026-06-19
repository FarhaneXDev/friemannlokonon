from django.urls import path
from .views import (
    ServiceListView,
    ServiceAdminListCreateView, ServiceAdminDetailView,
)

urlpatterns = [
    path("", ServiceListView.as_view(), name="service-list"),

    path("admin/", ServiceAdminListCreateView.as_view(), name="service-admin-list"),
    path("admin/<int:id>/", ServiceAdminDetailView.as_view(), name="service-admin-detail"),
]
