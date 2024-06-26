# Generated by Django 5.0.3 on 2024-05-22 21:45

import django.db.models.deletion
import django.utils.timezone
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vlabs', '0003_remove_bookings_lab_bookings_computer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='computer',
            name='available_applications',
        ),
        migrations.AddField(
            model_name='laboratory',
            name='available_applications',
            field=models.ManyToManyField(to='vlabs.application'),
        ),
        migrations.CreateModel(
            name='Complaints',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('message', models.CharField(max_length=255)),
                ('time', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
