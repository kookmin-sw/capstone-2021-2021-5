from rest_framework import serializers

from .models import Emotion
from django.core.exceptions import ValidationError




class EmotionSerializer(serializers.ModelSerializer):
    """
    검색 기록(SearchRecord) Serializer
    """

    class Meta:
        model = Emotion
        fields = ["id","pubdate","image"]