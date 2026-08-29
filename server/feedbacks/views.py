from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Feedback
from .serializers import FeedbackSerializer


@api_view(["POST"])
def submit_feedback(request):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Login required"},
            status=401
        )

    if request.user.role != "villager":
        return Response(
            {"message": "You are not allowed"},
            status=403
        )

    feedback = Feedback.objects.create(
        user=request.user,
        rating=request.data.get("rating"),
        category=request.data.get("category"),
        message=request.data.get("message"),
        date=request.data.get("date"),
        time=request.data.get("time")
    )

    return Response(
        {"message": "Feedback submitted successfully!"},
        status=201
    )


@api_view(["GET"])
def get_feedbacks(request):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Login required"},
            status=401
        )

    if request.user.role != "admin":
        return Response(
            {"message": "You are not allowed"},
            status=403
        )

    feedbacks = Feedback.objects.all().order_by("-id")

    return Response(
        FeedbackSerializer(
            feedbacks,
            many=True
        ).data
    )


@api_view(["DELETE"])
def delete_feedback(request, id):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Login required"},
            status=401
        )

    if request.user.role != "admin":
        return Response(
            {"message": "You are not allowed"},
            status=403
        )

    try:
        feedback = Feedback.objects.get(id=id)
        feedback.delete()

        return Response(
            {"message": "Feedback deleted successfully"}
        )

    except Feedback.DoesNotExist:
        return Response(
            {"message": "Feedback not found"},
            status=404
        )
