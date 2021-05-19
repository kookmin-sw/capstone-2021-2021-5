# chat/routing.py
from django.conf.urls import url
from . import consumers
from . import advisers

websocket_urlpatterns = [
    url(r'^ws/chat/(?P<room_name>[^/]+)/$', consumers.ChatConsumer.as_asgi()),
    url(r'^ws/adviser/(?P<room_name>[^/]+)/$', advisers.adviserConsumer.as_asgi()),
]