from django.db import models

# Create your models here.
class chatRoom(models.Model):
    name=models.CharField(max_length=100,null=True,unique=True,verbose_name='방 이름')
    




