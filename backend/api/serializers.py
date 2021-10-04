from rest_framework import serializers
from .models import *  # Importing all models
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

# As I have 3 models, hence I'm creating 3 serializers


class ClientSerializer(serializers.ModelSerializer):
    # Alternative to the 'perform_create' function in views.py, to automatically fills
    # in the user field with the current/logged in user, use the code below.
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Client  # Specify the model you want to serialize
        fields = '__all__'  # Specify the fields you want to serialize


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TodolistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todolist
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name',
                  'last_name', 'email', 'password']

        extra_kwargs = {'password': {  # This allows any API call to the /api/users to only show username and not the password
            'write_only': True,
            'required': True,
        }}

    def create(self, validated_data):  # This allows us to create a new user with a hashed password
        user = User.objects.create_user(**validated_data)
        # Creates a new token for every new user registered
        Token.objects.create(user=user)

        return user
