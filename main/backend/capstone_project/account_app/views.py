from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.contrib.auth import get_user_model



User=get_user_model()

class UserInfoView(APIView):
    def get(self, request):
        user = request.user
        ret = {
            'username': user.username,
            'email': user.email,
            'gender': user.gender,
            'birthDate': user.birthDate,
            
        }
        return Response(ret, status=status.HTTP_200_OK)