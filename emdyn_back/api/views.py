# -*- coding: utf-8 -*-
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer

from emdyn_back.api.models import EmdynToken

import logging

emdynlogger = logging.getLogger(__name__)



class LoginEmdynObtainAuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        token, created = Token.objects.get_or_create(user=user)

        emdyn_tokens = EmdynToken.objects.filter(user=user)

        my_lics = []

        for x in emdyn_tokens:
            new_lic = {}
            new_lic['name'] = x.license_key.name
            new_lic['license'] = x.license_key.key
            new_lic['expires-on'] = x.license_key.expiration_date
            my_lics.append(new_lic)

        content = {'username': str(user.email), 'user_token': token.key, 'licenses': my_lics}

        emdynlogger.error(msg='error log on sucess login attempt', )


        return Response(content, status=status.HTTP_200_OK)


class ProcessStatus(APIView):

    def get(self, request):

        total_images = 250000
        processed_images = 45
        return Response(
            {"status": "we are still running", "image_count": total_images, "images_processed": processed_images})



class ErrorLog(APIView):

    def post(self, request):
        incoming_log = request.data
        return Response({"error":"arrived"})

