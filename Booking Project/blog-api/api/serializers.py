from rest_framework import serializers
from .models import BookingModel, TravelModel
from django.contrib.auth.models import User

class TravelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelModel
        fields = ['id', 'place', 'about', 'price', 'image']

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = ['id', 'name', 'phone', 'person', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']