from django.db import models


class Project(models.Model):
    TYPE_CHOICES = [
        ("fullstack", "Full Stack"),
        ("frontend", "Frontend"),
        ("backend", "Backend"),
    ]

    COLOR_CHOICES = [
        ("green", "Vert"),
        ("blue", "Bleu"),
        ("red", "Rouge"),
        ("purple", "Violet"),
        ("orange", "Orange"),
    ]

    title = models.CharField("Titre", max_length=200)
    slug = models.SlugField("Slug", unique=True, help_text="Généré automatiquement depuis le titre")
    type = models.CharField("Type", max_length=20, choices=TYPE_CHOICES, default="fullstack")
    description = models.TextField("Description courte")
    problem = models.TextField("Problème", help_text="Le problème que ce projet résout")
    solution = models.TextField("Solution", help_text="Comment vous l'avez résolu")

    results = models.TextField(
        "Résultats",
        help_text="Un résultat par ligne. Ex: Réduction de 70% du temps de traitement"
    )

    stack = models.CharField(
        "Stack technique",
        max_length=500,
        help_text="Technologies séparées par des virgules. Ex: Next.js, Django, PostgreSQL"
    )

    preview_color = models.CharField(
        "Couleur preview",
        max_length=10,
        choices=COLOR_CHOICES,
        default="green"
    )
    image = models.ImageField(
        "Image du projet",
        upload_to="projects/",
        blank=True,
        null=True
    )

    live_url = models.URLField("URL du site", blank=True, null=True)
    github_url = models.URLField("URL GitHub", blank=True, null=True)

    year = models.CharField("Année", max_length=4)
    duration = models.CharField("Durée", max_length=50, help_text="Ex: 6 semaines")
    status = models.CharField("Statut", max_length=50, help_text="Ex: En production")

    featured = models.BooleanField("Projet mis en avant", default=False)
    order = models.PositiveIntegerField("Ordre d'affichage", default=0)
    is_active = models.BooleanField("Actif", default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title

    def get_stack_list(self):
        return [s.strip() for s in self.stack.split(",") if s.strip()]

    def get_results_list(self):
        return [r.strip() for r in self.results.split("\n") if r.strip()]
