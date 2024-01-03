from rest_framework import routers
from django.urls import path, include
from .views import TravelViewSet, BookingViewSet

router = routers.DefaultRouter()
router.register('travels',TravelViewSet)
router.register('bookings',BookingViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
