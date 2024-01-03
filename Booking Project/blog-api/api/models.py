from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class TravelModel(models.Model):
    id = models.AutoField(primary_key=True)
    place = models.CharField(max_length=100, blank=True)
    about = models.TextField(blank=True)
    price = models.IntegerField()
    image = models.ImageField(default=None, blank=True)

    def __str__(self):
        return self.place

class BookingModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True)
    phone = models.IntegerField()
    person = models.IntegerField()
    created_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.person
