from django.urls import path

from .views import approve_user, reject_user, signup_requests


urlpatterns = [
    path("requests/", signup_requests),
    path("approve/<int:id>/", approve_user),
    path("reject/<int:id>/", reject_user),
]
