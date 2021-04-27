from rest_framework import serializers

from .models import chatRoom
from django.core.exceptions import ValidationError


class chatRoomSerializer(serializers.ModelSerializer):
    """
    검색 기록(SearchRecord) Serializer
    """

    class Meta:
        model = chatRoom
        fields = "__all__"