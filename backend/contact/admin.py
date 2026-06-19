from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "subject", "status", "created_at"]
    list_editable = ["status"]
    list_filter = ["status", "created_at"]
    search_fields = ["name", "email", "subject"]
    readonly_fields = ["name", "email", "subject", "message", "created_at"]
    ordering = ["-created_at"]

    def has_add_permission(self, request):
        return False
