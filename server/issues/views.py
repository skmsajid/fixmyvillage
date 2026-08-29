from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Issue
from .serializers import IssueSerializer


@api_view(["GET", "POST"])
def issue_list(request, category):

    if request.method == "GET":

        if not request.user.is_authenticated:
            return Response(
                {"message": "Login required"},
                status=401
            )

        issues = Issue.objects.filter(
            category=category
        )

        all_issues = IssueSerializer(
            issues,
            many=True
        )

        return Response(all_issues.data)



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

    issue = Issue.objects.create(
        category=category,
        user=request.user,
        street=request.data.get("street"),
        house_no=request.data.get("houseNo"),
        description=request.data.get("description"),
        photo=request.FILES.get("photo"),
        date=request.data.get("date"),
        time=request.data.get("time")
    )

    return Response(
        {"message": "Issue submitted successfully!"},
        status=201
    )


@api_view(["PUT"])
def update_issue_status(request, category, id):

    if not request.user.is_authenticated:
        return Response(
            {"message": "Login required"},
            status=401
        )

    if request.user.role not in ["worker", "admin"]:
        return Response(
            {"message": "You are not allowed"},
            status=403
        )

    try:
        issue = Issue.objects.get(
            id=id,
            category=category
        )

    except Issue.DoesNotExist:
        return Response(
            {"message": "Issue not found"},
            status=404
        )

    issue.status = request.data.get(
        "status",
        issue.status
    )

    if "deadline" in request.data:
        issue.deadline = request.data["deadline"]

    if "reason" in request.data:
        issue.reason = request.data["reason"]

    issue.save()

    return Response({
        "success": True,
        "issue": IssueSerializer(issue).data
    })