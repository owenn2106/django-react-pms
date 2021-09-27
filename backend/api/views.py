from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from django.contrib.auth.models import User
from .serializers import *
from .models import *

# Create your views here.
# Viewsets provides implementation for CRUD operations by default.


class ClientView(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    # queryset = Client.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

    def get_queryset(self):
        user = self.request.user
        queryset = Client.objects.filter(user=user)

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    # queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['client', 'status']

    def get_queryset(self):
        user = self.request.user
        queryset = Project.objects.filter(user=user)

        return queryset


class TodolistView(viewsets.ModelViewSet):
    serializer_class = TodolistSerializer
    # queryset = Todolist.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication, )

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project', 'status']

    def get_queryset(self):
        user = self.request.user
        queryset = Todolist.objects.filter(user=user)

        return queryset


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomAuthToken(ObtainAuthToken):

    def post(self, request):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'fname': user.first_name,
            'email': user.email
        })
