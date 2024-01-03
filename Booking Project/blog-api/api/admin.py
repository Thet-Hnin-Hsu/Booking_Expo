from django.contrib import admin
from .models import BookingModel, TravelModel

# Register your models here.

admin.site.register(BookingModel)
admin.site.register(TravelModel)
