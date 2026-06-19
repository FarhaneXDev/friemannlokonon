from rest_framework.generics import (
    ListAPIView, RetrieveAPIView,
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Project
from .serializers import ProjectListSerializer, ProjectDetailSerializer
from rest_framework.permissions import IsAuthenticated



class ProjectListView(ListAPIView):
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        queryset = Project.objects.filter(is_active=True)
        project_type = self.request.query_params.get("type")
        if project_type and project_type != "tous":
            queryset = queryset.filter(type=project_type)
        return queryset


class ProjectDetailView(RetrieveAPIView):
    serializer_class = ProjectDetailSerializer
    queryset = Project.objects.filter(is_active=True)
    lookup_field = "slug"


class FeaturedProjectsView(ListAPIView):
    serializer_class = ProjectListSerializer

    def get_queryset(self):
        return Project.objects.filter(is_active=True, featured=True)



class ProjectAdminListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectDetailSerializer
    queryset = Project.objects.all().order_by("order", "-created_at")
    parser_classes = [MultiPartParser, FormParser, JSONParser]


class ProjectAdminDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectDetailSerializer
    queryset = Project.objects.all()
    lookup_field = "id"
    parser_classes = [MultiPartParser, FormParser, JSONParser]
