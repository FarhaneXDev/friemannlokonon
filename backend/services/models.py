from django.db import models


class Service(models.Model):
    name = models.CharField("Nom", max_length=200)
    description = models.TextField("Description")

    features = models.TextField(
        "Fonctionnalités",
        help_text="Une fonctionnalité par ligne"
    )

    price = models.CharField("Prix", max_length=100, help_text="Ex: À partir de 300k")
    price_label = models.CharField("Label prix", max_length=100, help_text="Ex: FCFA · délai 2–3 sem.")
    popular = models.BooleanField("Populaire", default=False)
    order = models.PositiveIntegerField("Ordre", default=0)
    is_active = models.BooleanField("Actif", default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Service"
        verbose_name_plural = "Services"
        ordering = ["order"]

    def __str__(self):
        return self.name

    def get_features_list(self):
        return [f.strip() for f in self.features.split("\n") if f.strip()]
