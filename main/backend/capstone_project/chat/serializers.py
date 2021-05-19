from rest_framework import serializers

from .models import chatRoom,AdviserRoom
from django.core.exceptions import ValidationError


class chatRoomSerializer(serializers.ModelSerializer):
    """
    검색 기록(SearchRecord) Serializer
    """

    class Meta:
        model = chatRoom
        fields = "__all__"

class adviseRoomSerializer(serializers.ModelSerializer):
    """
    검색 기록(SearchRecord) Serializer
    """

    class Meta:
        model = AdviserRoom
        fields = "__all__"