from django.urls import path, include

import diary_app.views as views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('crud', views.DiaryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]