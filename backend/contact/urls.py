from django.urls import path
from .views import (
    ContactMessageView,
    ContactAdminListView, ContactAdminDetailView,
)

urlpatterns = [
    path("", ContactMessageView.as_view(), name="contact-message"),

    path("admin/", ContactAdminListView.as_view(), name="contact-admin-list"),
    path("admin/<int:id>/", ContactAdminDetailView.as_view(), name="contact-admin-detail"),
]
