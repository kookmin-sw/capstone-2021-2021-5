from rest_framework import serializers

from .models import Diary
from django.core.exceptions import ValidationError
import datetime
from analysis.models import Emotion


class DiarySerializer(serializers.ModelSerializer):
    """
    검색 기록(SearchRecord) Serializer
    """

    class Meta:
        model = Diary
        fields = "__all__"

    def validate(self, data):
       
        if self.context['request'].method != "PUT" and Diary.objects.filter(profile=self.context['request'].user, title=data['title']).exists() == True: # 만약 같은 계정의 project title이 중복되면
            raise ValidationError('duplicated title')
        today = datetime.date.today()
        
        if self.context['request'].method != "PUT" and Diary.objects.filter(profile=self.context['request'].user, pubdate = today ).exists():
            raise ValidationError('already written')
        if self.context['request'].method == "POST" and not Emotion.objects.filter(profile=self.context['request'].user,pubdate = today).exists():
            raise ValidationError('not analyzed')

        data['pubdate'] =  today
        data['weather'] =  Emotion.objects.get(profile=self.context['request'].user,pubdate = today).weather
        data['profile'] = self.context['request'].user #project 생성시 항상 author을 해당 계정으로 설정
        return data
