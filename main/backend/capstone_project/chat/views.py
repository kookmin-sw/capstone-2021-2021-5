from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import chatRoom,AdviserRoom
from .serializers import chatRoomSerializer,adviseRoomSerializer
import ast
from operator import add
import datetime



def index(request):
    return render(request, 'chat/index.html', {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })


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

def objects_list(obs):
    result = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0]
    length = len(obs)
    today = datetime.date.today()

    for ob in obs:
        ob = ob.profile_emotion.filter(pubdate=today)[0]
        ob_list = ast.literal_eval(ob.emotions)
        result = map(add, result, ob_list)
    result = map(lambda x: x/length, result)
    result = list(result)
    return result


class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = chatRoom.objects.all()
    serializer_class = chatRoomSerializer
    http_method_names = ['get','post']  # get 메소드만 허용


class ChatStatisticView(APIView):
    def get(self, request):
        room_id = request.query_params.get('room_id', '') 
        room_id = int(room_id)
        try:
            room = chatRoom.objects.get(pk = room_id)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        participants = room.participants.all()

        if len(participants) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        
        emotion_list = objects_list(participants)
        result = {}
        result['emotions'],result['max_emotion'] = emotion_stat_output_generator(emotion_list)
        
        return Response(result)

        
class AdviserRoomViewSet(viewsets.ModelViewSet):
    queryset = AdviserRoom.objects.all()
    serializer_class = adviseRoomSerializer
    http_method_names = ['get','post']  # get 메소드만 허용
