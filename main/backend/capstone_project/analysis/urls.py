from django.contrib import admin
from django.urls import path,include
import analysis.views as views

urlpatterns = [
        path('tendancy/', views.TendancyView.as_view(),name='tendancy'),
        path('emotion_analyze/', views.EmotionAnalyzeView.as_view(),name='emotion_analyze'),
        path('emotion_statistic/', views.EmotionStatisticView.as_view(),name='emotion_statistic'),
]
