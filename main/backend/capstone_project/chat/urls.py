from django.conf.urls import url
from . import views
from django.urls import path,include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('crud', views.ChatRoomViewSet)
router.register('adviser', views.AdviserRoomViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # url(r'^$', views.index, name='index'),
    # url(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
    path('chat_statistic/', views.ChatStatisticView.as_view(),name='chat_statistic'),
]