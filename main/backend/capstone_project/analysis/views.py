from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from .models import Tendancy,Emotion
import ast

from django.core.files.uploadedfile import InMemoryUploadedFile
import io
import sys

from django.conf import settings

from util import face
import base64
import uuid

import datetime

User = get_user_model()
# Create your views here.

class TendancyView(APIView):

    def get(self, request):
        res = {}
        res["exist"]=False
        if Tendancy.objects.filter(profile=request.user).exists():
            res["exist"]=True
        return Response(res)

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

    def put(self, request):
         #만약 해당유저가 이미 성향조사를 완료 안했으면
        if not Tendancy.objects.filter(profile=request.user).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        answers=request.data['answer']
        tendancy=Tendancy.objects.get(profile=request.user)
        tendancy.answer=answers
        tendancy.save()

        return Response(status=status.HTTP_200_OK)
     


class EmotionAnalyzeView(APIView):
    def post(self, request):
        #만약 해당유저가 이미 성향조사를 완료했으면
        # if Tendancy.objects.filter(profile=request.user).exists():
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

        surveys = answers=request.data['answer']
  
        try:
            f=request.FILES['image'].read()
        except :
            return Response("invalid image file!",status=status.HTTP_400_BAD_REQUEST)
        existing_filename=request.FILES['image'].name
        input_image=io.BytesIO(f)
        
        instance = face.FaceClass()
        emotion_dict,img = instance.face(input_image)
        
        img_io = io.BytesIO()
        img.save(img_io, "JPEG")

        filename = '%s%s' % ( uuid.uuid4(),existing_filename)
        today = datetime.date.today()
        if not Emotion.objects.filter(profile=request.user,pubdate= today).exists():
            emotion=Emotion()
            emotion_list = list(emotion_dict.values())
            emotion_str=str(emotion_list)
            emotion.emotions=emotion_str
            emotion.profile=request.user
            emotion.image = InMemoryUploadedFile(img_io, None, filename, 
                        'image/jpeg',sys.getsizeof(img_io), None )
            image_path =  emotion.image.url
            emotion.save()
        else:
            emotion = Emotion.objects.get(profile=request.user,pubdate= today)
            emotion_list = list(emotion_dict.values())
            emotion_str=str(emotion_list)
            emotion.emotions=emotion_str
            emotion.profile=request.user
            emotion.image = InMemoryUploadedFile(img_io, None, filename, 
                        'image/jpeg',sys.getsizeof(img_io), None )
            image_path =  emotion.image.url
            emotion.save()
            
        emotion_json = {}
        emotion_json['image'] = image_path

       
        emotion_json['emotions'] = emotion_list

        return Response(emotion_json)

