from django.contrib import admin
from django.urls import path,include
import account_app.views as views


urlpatterns = [
    path("rest-auth/", include('rest_auth.urls')),
    path("rest-auth/registration/", include('rest_auth.registration.urls')),
    path('userinfo/', views.UserInfoView.as_view(),name='userinfo'),
]
