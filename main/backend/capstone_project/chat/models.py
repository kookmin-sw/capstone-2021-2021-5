from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class chatRoom(models.Model):
    name=models.CharField(max_length=100,null=True,unique=True,verbose_name='방 이름')
    
    # creater= models.OneToOneField(
    #     User,
    #     on_delete=models.CASCADE,null=True
    # )
    participants = models.ManyToManyField(User,blank=True,related_name='room_participants')


    numbers = models.IntegerField(null = True, default=0)


# class AdviserRoom(models.Model):
#     name=models.CharField(max_length=100,null=True,unique=True,verbose_name='방 이름')

#     numbers = models.IntegerField(null = True, default=0)

    

    




