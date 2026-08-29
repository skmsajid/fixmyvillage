from django.db import models
from users.models import User


class Issue(models.Model):

    category = models.CharField(
        max_length=20,
        choices=[
            ("electricity", "Electricity"),
            ("water", "Water"),
            ("garbage", "Garbage"),
            ("drainage", "Drainage"),
        ]
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    street = models.CharField(max_length=100)

    house_no = models.CharField(max_length=50)

    description = models.TextField()

    photo = models.ImageField(
        upload_to="issues/",
        default="issues/demo.jpg"
    )

    date = models.CharField(max_length=20)

    time = models.CharField(max_length=20)

    status = models.CharField(
    max_length=20,
    choices=[
        ("Pending", "Pending"),
        ("Rejected", "Rejected"),
        ("Assigned", "Assigned"),
        ("In Progress", "In Progress"),
        ("Resolved", "Resolved"),
    ],
    default="Pending"
)

    deadline = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    reason = models.TextField(
        blank=True,
        null=True
    )