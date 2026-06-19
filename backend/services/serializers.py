from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = [
            "id", "name", "description", "features",
            "price", "price_label", "popular", "order", "is_active",
        ]

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["features"] = instance.get_features_list()
        return rep

    def to_internal_value(self, data):
        data = data.copy()
        features_value = data.get("features")
        if isinstance(features_value, list):
            data["features"] = "\n".join(features_value)
        return super().to_internal_value(data)
