from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from .serializers import SignupSerializer


def generate_tokens_for_user(user: User) -> dict:
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}


class EmailPasswordLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email", "").strip().lower()
        password = request.data.get("password", "")
        consent = request.data.get("consent", False)
        if not consent:
            return Response({"detail": "Consent is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not email or not password:
            return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            username = user.username
        except User.DoesNotExist:
            return Response({"detail": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"detail": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        tokens = generate_tokens_for_user(user)
        return Response({"user": {"id": user.id, "email": user.email, "username": user.username}, "tokens": tokens})


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("credential")
        consent = request.data.get("consent", False)
        if not consent:
            return Response({"detail": "Consent is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not token:
            return Response({"detail": "Missing Google credential."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request())
            email = idinfo.get("email")
            if not email:
                raise ValueError("No email in token")
            user, _created = User.objects.get_or_create(
                email=email,
                defaults={"username": email.split("@")[0]},
            )
            tokens = generate_tokens_for_user(user)
            return Response({"user": {"id": user.id, "email": user.email, "username": user.username}, "tokens": tokens})
        except Exception:
            return Response({"detail": "Invalid Google credential."}, status=status.HTTP_401_UNAUTHORIZED)


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        tokens = generate_tokens_for_user(user)
        return Response({"user": {"id": user.id, "email": user.email, "username": user.username, "first_name": user.first_name}, "tokens": tokens}, status=status.HTTP_201_CREATED)

from django.shortcuts import render

# Create your views here.
