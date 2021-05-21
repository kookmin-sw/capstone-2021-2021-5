# chat/consumers.py
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from channels.exceptions import StopConsumer


import json
from .models import chatRoom

class ChatConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def add_participant(self,participant):
        room = chatRoom.objects.get(pk = int(self.room_name))
        room.participants.add(participant)
        room.numbers += 1
        room.save()

    @database_sync_to_async
    def del_participant(self,participant):
        room = chatRoom.objects.get(pk = int(self.room_name))
        room.participants.remove(participant)
        room.numbers -= 1
        room.save()
        if room.numbers == 0:
            room.delete() 

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        print( self.room_name)
        self.room_group_name = 'chat_%s' % self.room_name
        await self.add_participant(self.scope["user"])
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
   

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await self.del_participant(self.scope["user"])
        raise StopConsumer()
        

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        self.user = self.scope["user"]

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': self.user.username + ':' + message
            }
            
        )
       

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        
       
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
    