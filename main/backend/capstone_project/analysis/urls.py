from django.contrib import admin
from django.urls import path,include
import analysis.views as views

urlpatterns = [
        path('tendancy/', views.TendancyView.as_view(),name='tendancy'),
]
