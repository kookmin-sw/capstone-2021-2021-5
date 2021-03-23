from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

# Create your models here.
class customUser(AbstractUser):
   
   birthDate= models.DateTimeField(verbose_name='생년월일',null=True)
   
   genderChoices = (
        
        ('M', '남성'),
        
        ('F', '여성')
    )
   gender=models.CharField(max_length=1, choices=genderChoices,null=True)

   userTypeChoices = (
        
        ('Adviser', '상담사'),
        
        ('Normal', '일반')
    )
   userType=models.CharField(max_length=7, choices=userTypeChoices,null=True)
