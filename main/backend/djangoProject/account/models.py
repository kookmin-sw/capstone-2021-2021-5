from django.db import models

# Create your models here.
class User(models.Model):
    email = models.CharField(max_length=45, blank=True, null=True)
    addr = models.CharField(max_length=45, blank=True, null=True)
    regdate = models.DateTimeField(db_column='regDate', blank=True, null=True)  # Field name made lowercase.
    password = models.CharField(max_length=45, blank=True, null=True)
    tell = models.CharField(max_length=45, blank=True, null=True)
    usertype = models.CharField(db_column='userType', max_length=45, blank=True, null=True)  # Field name made lowercase.
    deldate = models.DateTimeField(db_column='delDate', blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
