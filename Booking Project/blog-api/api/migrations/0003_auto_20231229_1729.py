# Generated by Django 2.2 on 2023-12-29 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20231228_2224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookingmodel',
            name='person',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]