from django.urls import path
from .views import issue_list, update_issue_status


urlpatterns = [
    path("status/<str:category>/<int:id>/", update_issue_status),
    path("<str:category>/", issue_list),
]