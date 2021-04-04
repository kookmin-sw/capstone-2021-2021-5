# Generated by Django 3.1.6 on 2021-03-13 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='birthDate',
            field=models.DateTimeField(null=True, verbose_name='생년월일'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='gender',
            field=models.BooleanField(null=True, verbose_name='성별'),
        ),
    ]