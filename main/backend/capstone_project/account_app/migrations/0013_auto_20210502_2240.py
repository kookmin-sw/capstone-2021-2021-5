# Generated by Django 3.1.6 on 2021-05-02 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_app', '0012_auto_20210502_2232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to=''),
        ),
    ]
