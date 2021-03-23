from django.contrib.auth import get_user_model
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

User = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    """
    회원가입을 위한 serializer
    """
    # 성별
    gender = serializers.ChoiceField(choices=User.genderChoices)
    birthDate = serializers.DateTimeField()
    userType = serializers.ChoiceField(choices=User.userTypeChoices)
    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['gender'] = self.validated_data.get('gender', '')
        data_dict['birthDate'] = self.validated_data.get('birthDate', '')
        data_dict['userType'] = self.validated_data.get('userType', '')
        return data_dict


