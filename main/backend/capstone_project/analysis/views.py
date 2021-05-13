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
from util.external_api import weather_report
import base64
import uuid
import ast
from operator import add

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
     

def emotion_stat_output_generator(emotion_lis):
    emotion_dic = {'0':"분노" , '1':'경멸', '2':'불쾌', '3':'공포', '4':'행복', '5':'중립', '6':'슬픔', '7':'놀람' }
    result = []

    max_emotion_idx = max(emotion_lis)
    max_emotion_idx = emotion_lis.index(max_emotion_idx)
    max_emotion = emotion_dic[str(max_emotion_idx)]

    for i,emotion in enumerate(emotion_lis):
        result_dic = {'name':emotion_dic[str(i)], 'emotion':emotion*100}
        result.append(result_dic)
    return result, max_emotion

def weather_translator(weather):
    weather_dict = {
        # 맑음:0, 흐림:1,비:2,번개:3,눈:4,안개:5
        'clear sky': '0',
        'few clouds': '1',
        'scattered clouds': '1',
        'broken clouds': '1',
        'shower rain': '2',
        'rain': '2',
        'thunderstorm': '3',
        'snow': '4',
        'mist': '5'
    }
    return weather_dict[weather]

class EmotionAnalyzeView(APIView):
    def post(self, request):
        #만약 해당유저가 이미 성향조사를 완료했으면
        # if Tendancy.objects.filter(profile=request.user).exists():
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

        surveys = request.data['answer']
        surveys_list = ast.literal_eval(surveys)

        axis = request.data['axis'] #lat,long
        axis_list = ast.literal_eval(axis)
  
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
        emotion_list = list(emotion_dict.values())
        weather_str = weather_report(axis_list[0],axis_list[1])
        weathers = weather_translator(weather_str)

        if not Emotion.objects.filter(profile=request.user,pubdate= today).exists():
            emotion=Emotion()
            emotion_str=str(emotion_list)
            emotion.emotions=emotion_str
            emotion.profile=request.user
            emotion.weather = weathers
            emotion.image = InMemoryUploadedFile(img_io, None, filename, 
                        'image/jpeg',sys.getsizeof(img_io), None )
            image_path =  emotion.image.url
            emotion.save()
        else:
            emotion = Emotion.objects.get(profile=request.user,pubdate= today)
            emotion_str=str(emotion_list)
            emotion.emotions=emotion_str
            emotion.profile=request.user
            emotion.weather = weathers
            emotion.image = InMemoryUploadedFile(img_io, None, filename, 
                        'image/jpeg',sys.getsizeof(img_io), None )
            image_path =  emotion.image.url
            emotion.save()
            
        emotion_json = {}
        emotion_json['image'] = image_path

       
        emotion_json['emotions'], emotion_json['max_emotion'] = emotion_stat_output_generator(emotion_list)

        return Response(emotion_json)

def objects_list(obs):
    result = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]
    length = len(obs)

    for ob in obs:
        ob_list = ast.literal_eval(ob.emotions)
        result = map(add, result, ob_list)
    result = map(lambda x: x/length, result)
    result = list(result)
    return result

class EmotionStatisticView(APIView):
    
    def post(self, request):
        past = (datetime.datetime.now() - datetime.timedelta(days=7)).date()
        today = datetime.date.today()
       
        emotions = Emotion.objects.filter(profile=request.user,pubdate__range=[past,today])
        
        if len(emotions) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        emotion_list = objects_list(emotions)

        result = {}
        result['emotions'],result['max_emotion'] = emotion_stat_output_generator(emotion_list)
        
        return Response(result)

    def get(self, request):
        weather_input = request.query_params.get('weather', '') 
        
        emotions = Emotion.objects.filter(profile=request.user,weather = weather_input)

        if len(emotions) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        emotion_list = objects_list(emotions)

        result = {}
        result['emotions'],result['max_emotion'] = emotion_stat_output_generator(emotion_list)
        
        return Response(result)