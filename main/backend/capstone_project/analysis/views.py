from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from .models import Tendancy,Emotion,Music
import ast

from django.core.files.uploadedfile import InMemoryUploadedFile
from .serializers import EmotionSerializer
import io
import sys

from django.conf import settings

from util import face
from util.external_api import weather_report
from django.http import HttpResponseForbidden
import base64
import uuid
import ast
from operator import add
import csv

import datetime
from django.conf import settings
from rest_framework import viewsets

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
        'Clear': '0',
        'Clouds': '1',
        'Ash': '1',
        'Dust': '1',
        'Sand': '1',
        'Rain': '2',
        'Squall': '2',
        'Drizzle': '2',
        'Thunderstorm': '3',
        'Snow': '4',
        'Mist': '5',
        'Smoke': '5',
        'Haze': '5',
        'Fog': '5',
        'Tornado': '6'
    }
    return weather_dict[weather]

def music_classifier(emotion,emotion_obj):
    emotion_dic = {"분노" : 0 , '경멸':1, '불쾌':0, '공포':1, '행복':0, '중립':1, '슬픔':0, '놀람':1 }
    emotion_index = emotion_dic[emotion]
    musics = None
    emotion_obj.connection.clear() 
    if emotion_index != 2:
        musics = Music.objects.filter(emotion=emotion_index).order_by('?')[:10]
    else:
        musics = Music.objects.all().order_by('?')[:10]
    
    result = []
    for music in musics:
        emotion_obj.connection.add(music)
        result.append({"title": music.title,"url":music.iframe_url})
    return result
    
        
class EmotionAnalyzeView(APIView):
    
    def get(self, request):
        today = datetime.date.today()
        
        result = {'result':False}
        if Emotion.objects.filter(pubdate = today, profile = request.user).exists():
            result['result'] = True
        return Response(result)


    def post(self, request):

        # surveys = request.data['answer']
        # surveys_list = ast.literal_eval(surveys)

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
        emotion = None

        if not Emotion.objects.filter(profile=request.user,pubdate= today).exists():
            emotion=Emotion()
            emotion_str=str(emotion_list)
            emotion.emotions = emotion_str
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

        emotion_stat, emotion_max = emotion_stat_output_generator(emotion_list)
        emotion_musics = music_classifier(emotion_max,emotion)

        emotion_json['emotions'] = emotion_stat
        emotion_json['max_emotion'] = emotion_max
        emotion_json['musics'] = emotion_musics
       
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

class DataInjectionView(APIView):
    def get(self, request):
        if not request.user.is_superuser:
            return HttpResponseForbidden()

        base_url = settings.BASE_DIR

        CSV_PATH = base_url + "/util/sample.csv"
        with open(CSV_PATH, newline='') as csvfile:
            data_reader = csv.DictReader(csvfile)
            for row in data_reader:
                # print(row)
                Music.objects.create(
                                title       = row['Name'],
                                emotion      = int(row['emotion']),
                                iframe_url = row['url'],
                        )
        
        return Response("good!!")

    def post(self, request):
        result = {'result':False}
        if  request.user.is_superuser:
            result['result'] = True
        return Response(result)

class EmotionHistroyView(APIView):
    
    def get(self, request):

        emotion_records = Emotion.objects.filter(profile=request.user)
        serializer = EmotionSerializer(emotion_records,many=True)
        return Response(serializer.data)
    
    def post(self, request):
        
        pk = int(request.data['pk'])
        result = {}

        emotion_record = Emotion.objects.get(pk=pk)
        musics = emotion_record.connection.all()

        emotion_list = ast.literal_eval(emotion_record.emotions)
        
        emotion_stat, emotion_max = emotion_stat_output_generator(emotion_list)

        res_lis = []
        for music in musics:
            res_lis.append({"title": music.title,"url":music.iframe_url})
    

        result['pubDate'] = emotion_record.pubdate
        result['image'] = emotion_record.image.url
        result['emotions'] = emotion_stat
        result['max_emotion'] = emotion_max
        result['musics'] = res_lis

        
        return Response(result)

        
         
class RandomMusicView(APIView):
    
    def get(self, request):
        result = {}
        musics = Music.objects.all().order_by('?')[:10]
        music_lis = []
        for music in musics:
            music_lis.append({"title": music.title,"url":music.iframe_url})
        result["musics"] = music_lis
   
        return Response(result)
    