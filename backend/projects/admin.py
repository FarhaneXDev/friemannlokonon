from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "type", "year", "featured", "is_active", "order"]
    list_editable = ["featured", "is_active", "order"]
    list_filter = ["type", "featured", "is_active", "year"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    ordering = ["order", "-created_at"]

    fieldsets = (
        ("Informations principales", {
            "fields": ("title", "slug", "type", "year", "duration", "status")
        }),
        ("Contenu", {
            "fields": ("description", "problem", "solution", "results")
        }),
        ("Technique", {
            "fields": ("stack", "preview_color", "image")
        }),
        ("Liens", {
            "fields": ("live_url", "github_url")
        }),
        ("Affichage", {
            "fields": ("featured", "order", "is_active")
        }),
    )
