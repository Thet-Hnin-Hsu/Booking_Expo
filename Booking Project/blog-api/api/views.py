from django.shortcuts import render
from api.models import BookingModel, TravelModel
from api.serializers import BookingSerializer, TravelSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User

class TravelViewSet(viewsets.ModelViewSet):
    serializer_class = TravelSerializer
    queryset = TravelModel.objects.all()
    authentication_classes = (TokenAuthentication,)

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = BookingModel.objects.all()
    authentication_classes = (TokenAuthentication,)

class BookingDelete(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self,request,id):
        bookings = BookingModel.objects.get(id=id)
        return Response("success")

class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)

    def get(self,request):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)