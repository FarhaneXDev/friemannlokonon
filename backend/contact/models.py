from django.db import models


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ("new", "Nouveau"),
        ("read", "Lu"),
        ("replied", "Répondu"),
        ("archived", "Archivé"),
    ]

    name = models.CharField("Nom", max_length=200)
    email = models.EmailField("Email")
    subject = models.CharField("Sujet", max_length=300)
    message = models.TextField("Message")
    status = models.CharField(
        "Statut", max_length=20,
        choices=STATUS_CHOICES,
        default="new"
    )
    created_at = models.DateTimeField("Reçu le", auto_now_add=True)

    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.subject}"
