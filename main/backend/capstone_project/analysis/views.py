from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from .models import Tendancy
import ast

User = get_user_model()
# Create your views here.

class TendancyView(APIView):
    def post(self, request):
        #만약 해당유저가 이미 성향조사를 완료했으면
        if Tendancy.objects.filter(profile=request.user).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        answers=request.data['answer']
        tendancy=Tendancy()
        tendancy.answer=answers
        tendancy.profile=request.user
        tendancy.save()
        
        return Response(status=status.HTTP_200_OK)

    # def put(self, request):
      

    #     answers=request.data['answer']
    #     tendancy=Tendancy.objects.get(profile=request.user)
    #     tendancy.answer=answers
    #     tendancy.profile=request.user
    #     tendancy.save()
        
    #     return Response(status=status.HTTP_200_OK)