from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Diary(models.Model):
    pubdate=models.DateField(auto_now_add=True,verbose_name='날짜',null=False)
    profile= models.ForeignKey(
        User,
        on_delete=models.CASCADE,null=True
    )
    title = models.CharField(max_length=100,null=True,verbose_name='제목')
    body = models.TextField()
    weather=models.CharField(max_length=20,null=True)