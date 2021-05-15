from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserInfoSerializer,UserInfoUpdateSerializer


User=get_user_model()

class UserInfoView(APIView):
    def get(self, request):
        user = request.user
        ret = UserInfoSerializer(user)
        return Response(ret.data, status=status.HTTP_200_OK)

    def put(self, request):
        if request.user.id == None:
            return Response("invalid request", status=status.HTTP_400_BAD_REQUEST)
        else:
            user_id = request.user.id
            user_object = User.objects.get(id=user_id)
          
 
            update_user_serializer = UserInfoUpdateSerializer(user_object, data=request.data)
            
            if update_user_serializer.is_valid():
                update_user_serializer.save()
                return Response(update_user_serializer.data, status=status.HTTP_200_OK)
            else:
                print(update_user_serializer.errors)
                return Response("invalid request", status=status.HTTP_400_BAD_REQUEST)
     
