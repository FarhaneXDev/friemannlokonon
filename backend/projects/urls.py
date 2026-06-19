from django.urls import path
from .views import (
    ProjectListView, ProjectDetailView, FeaturedProjectsView,
    ProjectAdminListCreateView, ProjectAdminDetailView,
)

urlpatterns = [
    path("", ProjectListView.as_view(), name="project-list"),
    path("featured/", FeaturedProjectsView.as_view(), name="project-featured"),

    path("admin/", ProjectAdminListCreateView.as_view(), name="project-admin-list"),
    path("admin/<int:id>/", ProjectAdminDetailView.as_view(), name="project-admin-detail"),

    path("<slug:slug>/", ProjectDetailView.as_view(), name="project-detail"),
]
