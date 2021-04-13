from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import chatRoom
from .serializers import chatRoomSerializer

def index(request):
    return render(request, 'chat/index.html', {})

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })

class ChatRoomViewSet(viewsets.ModelViewSet):
    queryset = chatRoom.objects.all()
    serializer_class = chatRoomSerializer
    http_method_names = ['get']  # get 메소드만 허용

    # def post(self, request):
    #     room_name = request.data['room_name']
    #     if chatRoom.objects.filter(name=room_name).exists():
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
        
    #     room = chatRoom()
    #     room.name=room_name
    #     room.save()
    #     return Response(status=status.HTTP_200_OK)
        
        
        
