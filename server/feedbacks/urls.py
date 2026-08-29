from django.urls import path

from .views import (
    submit_feedback,
    get_feedbacks,
    delete_feedback
)


urlpatterns = [
    path("", get_feedbacks),
    path("submit/", submit_feedback),
    path("<int:id>/", delete_feedback),
]