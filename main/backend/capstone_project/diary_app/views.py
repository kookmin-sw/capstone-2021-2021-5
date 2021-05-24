from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .models import Diary
from django.contrib.auth import get_user_model
from .serializers import DiarySerializer

User = get_user_model()
# Create your views here.

class DiaryViewSet(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def list(self, request):

        queryset = Diary.objects.filter(profile=request.user)
        serializer = DiarySerializer(queryset, many=True)
        return Response(serializer.data)