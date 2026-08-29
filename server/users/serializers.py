from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            aadhar=validated_data["aadhar"],
            password=validated_data["password"],
            role="villager",
            status="pending"
        )

        return user
