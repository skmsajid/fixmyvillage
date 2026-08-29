from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):


    email = models.EmailField(unique=True)

    aadhar = models.CharField(max_length=12, unique=True, blank=True, null=True)

    role = models.CharField(
        max_length=20,
        choices=[
            ("villager", "Villager"),
            ("worker", "Worker"),
            ("admin", "Admin"),
        ],
        default="villager"
    )

    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
        ],
        default="pending"
    )