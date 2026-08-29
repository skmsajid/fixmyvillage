from django.urls import path
from .views import register_user, login_user, get_user, logout_user, csrf_token


urlpatterns = [
    path("csrf/", csrf_token),
    path("signup/", register_user, name='signup'),
    path("login/", login_user, name='signup'),
    path("logout/", logout_user),
    path("users/<int:id>/", get_user, name='get_user'),
]