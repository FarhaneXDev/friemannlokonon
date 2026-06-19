from rest_framework import serializers
from .models import Project


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer léger pour la liste des projets (public, lecture uniquement)"""
    stack = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "type", "description",
            "stack", "year", "preview_color", "featured", "image",
        ]

    def get_stack(self, obj):
        return obj.get_stack_list()


class ProjectDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id", "title", "slug", "type", "description",
            "problem", "solution", "results", "stack",
            "year", "duration", "status",
            "preview_color", "image",
            "live_url", "github_url",
            "featured", "order", "is_active",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["stack"] = instance.get_stack_list()
        rep["results"] = instance.get_results_list()
        return rep

    def to_internal_value(self, data):
        data = data.copy()

        stack_value = data.get("stack")
        if isinstance(stack_value, list):
            data["stack"] = ", ".join(stack_value)

        results_value = data.get("results")
        if isinstance(results_value, list):
            data["results"] = "\n".join(results_value)

        return super().to_internal_value(data)
