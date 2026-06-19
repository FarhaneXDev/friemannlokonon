from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = "Friemann LOKONON — Portfolio Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Tableau de bord"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("authentication.urls")),
    path("api/projects/", include("projects.urls")),
    path("api/services/", include("services.urls")),
    path("api/contact/", include("contact.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
