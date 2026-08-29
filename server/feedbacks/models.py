from django.db import models
from users.models import User


class Feedback(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    rating = models.IntegerField(
        choices=[
            (1, "1"),
            (2, "2"),
            (3, "3"),
            (4, "4"),
            (5, "5"),
        ]
    )

    category = models.CharField(max_length=50)

    message = models.TextField(blank=True)

    date = models.DateField()

    time = models.TimeField()