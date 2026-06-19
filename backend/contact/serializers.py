from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "name", "email", "subject", "message", "status", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_email(self, value):
        if not value or "@" not in value:
            raise serializers.ValidationError("Adresse email invalide.")
        return value

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Le message doit contenir au moins 10 caractères.")
        return value
