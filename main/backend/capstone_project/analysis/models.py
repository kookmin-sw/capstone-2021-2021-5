from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()



# Create your models here.
class Tendancy(models.Model):
    pubdate=models.DateTimeField(auto_now_add=True,verbose_name='아카이빙 날짜/시각',null=True)
    answer=models.CharField(max_length=100,null=True,verbose_name='정답 리스트')
    profile= models.OneToOneField(
        User,
        on_delete=models.CASCADE,null=True
    )

# Create your models here.

class Music(models.Model):
    title = models.TextField(null = True)
    emotion = models.IntegerField(null = True) # 0:차분함, 1:신남
    iframe_url = models.URLField(max_length=500, null=True)

class Emotion(models.Model):
    pubdate=models.DateField(auto_now_add=True, verbose_name='아카이빙 날짜/시각',null=False)
    emotions=models.CharField(max_length=100,null=True,verbose_name='감정 리스트')
    profile= models.ForeignKey(
        User,
        on_delete=models.CASCADE,null=True,
        related_name='profile_emotion'
    )
    image = models.ImageField(null=True)

    weather = models.IntegerField(null = True)
    connection = models.ManyToManyField(Music,blank=True,related_name='music_emotion')

# class MusicTransmission(models.Model):
#     emotion = models.ForeignKey(Emotion, related_name="musics")
#     music = models.ForeignKey(Music, related_name="musics")


    

