from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import User


@api_view(["GET"])
def signup_requests(request):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Login required"},
            status=401
        )

    if request.user.role != "admin":
        return Response(
            {"message": "Admin access required"},
            status=403
        )

    users = User.objects.filter(
        status="pending"
    ).order_by("id")

    return Response([
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "aadhar": user.aadhar,
        }
        for user in users
    ])


@api_view(["PUT"])
def approve_user(request, id):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Login required"},
            status=401
        )

    if request.user.role != "admin":
        return Response(
            {"message": "Admin access required"},
            status=403
        )

    try:
        user = User.objects.get(
            id=id,
            status="pending"
        )
    except User.DoesNotExist:
        return Response(
            {"message": "Signup request not found"},
            status=404
        )

    user.status = "approved"
    user.save()

    return Response({
        "success": True,
        "status": user.status
    })


@api_view(["PUT"])
def reject_user(request, id):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Login required"},
            status=401
        )

    if request.user.role != "admin":
        return Response(
            {"message": "Admin access required"},
            status=403
        )

    try:
        user = User.objects.get(
            id=id,
            status="pending"
        )
    except User.DoesNotExist:
        return Response(
            {"message": "Signup request not found"},
            status=404
        )

    user.status = "rejected"
    user.save()

    return Response({
        "success": True,
        "status": user.status
    })