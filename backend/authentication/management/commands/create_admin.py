from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
import os


class Command(BaseCommand):
    help = "Crée un superuser non-interactivement depuis les variables d'environnement"

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not all([username, email, password]):
            self.stdout.write(self.style.ERROR(
                "Variables DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, "
                "DJANGO_SUPERUSER_PASSWORD requises."
            ))
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f"L'utilisateur '{username}' existe déjà."))
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' créé avec succès."))
