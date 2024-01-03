# Generated by Django 2.2 on 2023-12-28 15:54

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookingModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('person', models.IntegerField()),
                ('created_at', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('authors', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TravelModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('place', models.CharField(blank=True, max_length=100)),
                ('about', models.TextField(blank=True)),
                ('price', models.IntegerField()),
                ('image', models.ImageField(blank=True, default=None, upload_to='')),
            ],
        ),
        migrations.DeleteModel(
            name='BlogModel',
        ),
        migrations.AddField(
            model_name='bookingmodel',
            name='travel',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='api.TravelModel'),
        ),
    ]