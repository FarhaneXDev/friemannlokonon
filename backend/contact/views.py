from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageView(APIView):
    permission_classes = [AllowAny]

    @method_decorator(ratelimit(key="ip", rate="5/10m", method="POST", block=True))
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Message envoyé avec succès. Je vous répondrai sous 24h."},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactAdminListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ContactMessageSerializer
    queryset = ContactMessage.objects.all().order_by("-created_at")


class ContactAdminDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ContactMessageSerializer
    queryset = ContactMessage.objects.all()
    lookup_field = "id"