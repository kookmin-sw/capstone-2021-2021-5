# myproject.myapi.utils.py
from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser

from rest_framework.authtoken.models import Token
from django.db import close_old_connections

from urllib.parse import parse_qs
from django.contrib.auth import get_user_model
import jwt
from capstone_project.settings import SECRET_KEY
User = get_user_model()


@database_sync_to_async
def get_user(scope):
    query_string = parse_qs(scope['query_string'].decode())
    token = query_string.get('token')[0]
    # print(token)

    if not token:
        return AnonymousUser()
    try:
        user_jwt = jwt.decode(
                   token,
                    SECRET_KEY,
                     algorithms=["HS256"]
                )
        user = User.objects.get(pk=user_jwt['user_id'])
    except Exception as exception:
        return AnonymousUser()
    if not user.is_active:
        return AnonymousUser()
    return user

class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    see:
    https://channels.readthedocs.io/en/latest/topics/authentication.html#custom-authentication
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware):
       
        self.middleware = middleware
        self.scope = dict(scope)
        self.inner = self.middleware.inner

    async def __call__(self, receive, send):
        close_old_connections()
        # print("hello")
        self.scope["user"] = await get_user(self.scope)
        # print(self.scope["user"])

        # inner = self.inner(self.scope)
        return await self.inner(self.scope,receive, send) 


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))
