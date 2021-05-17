from django.contrib import admin
from django.urls import path,include
import analysis.views as views

urlpatterns = [
        path('tendancy/', views.TendancyView.as_view(),name='tendancy'),
        path('emotion_analyze/', views.EmotionAnalyzeView.as_view(),name='emotion_analyze'),
        path('emotion_statistic/', views.EmotionStatisticView.as_view(),name='emotion_statistic'),
        path('data_injection/', views.DataInjectionView.as_view(),name='data_injection'),
        path('emotion_histroy/', views.EmotionHistroyView.as_view(),name='emotion_histroy'),
        path('random_music/', views.RandomMusicView.as_view(),name='random_music'),
]

