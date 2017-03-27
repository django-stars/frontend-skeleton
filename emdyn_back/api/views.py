# -*- coding: utf-8 -*-
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from emdyn_back.api.models import EmdynToken
from emdyn_back.findface.models import ProcessJob
from emdyn_back.findface.serializer import ProcessJobSerializer, ProcessErrorSerializer

import logging

emdynlogger = logging.getLogger(__name__)


class LoginEmdynObtainAuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)

            if serializer.is_valid(raise_exception=True):
                user = serializer.validated_data['user']

                token, created = Token.objects.get_or_create(user=user)

                emdyn_tokens = EmdynToken.objects.filter(user=user)

                my_lics = []

                for x in emdyn_tokens:
                    new_lic = {'name': x.license_key.name, 'license': x.license_key.key,
                               'expires-on': x.license_key.expiration_date}
                    my_lics.append(new_lic)

                content = {'username': str(user.email), 'user_token': token.key, 'licenses': my_lics}

                emdynlogger.error(msg='error log on sucess login attempt', )

                return Response(content, status=status.HTTP_200_OK)
            else:
                return Response(serializer.error, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:

            # raise APIException("There was a problem!", status=status.HTTP_400_BAD_REQUEST)

            # except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProcessStatus(APIView):
    def get(self, request, pk):
        try:
            qs = ProcessJob.objects.get(pk=pk)

            content = {"status": str(qs.status), "image_count": str(qs.success_count)}

            # content = {"status": "we are still running", "image_count": total_images, "process_id": process_id, "images_processed": processed_images}
            return Response(content, content_type="application/json", status=status.HTTP_200_OK)
        except Exception as e:
            error_msg = {"error": str(e)}
            return Response(error_msg, content_type="application/json", status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, process_id):

        try:

            qs = ProcessJob.objects.get(pk=process_id)
            serializer = ProcessJobSerializer(qs)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            error_msg = {"error": str(e)}
            return Response(error_msg, content_type="application/json", status=status.HTTP_400_BAD_REQUEST)


class ErrorLog(APIView):
    def post(self, request):
        """
        Accept an error report and save it to /Findface.models.py model ProcessErrorLog
        :param request: 
        :return: 
        """
        # test_data = {"image_name":"image2.jpg",   "error_message":"test message",    "process":21, "image_count":23, "user":1, "error_source":"GM"}

        serializer = ProcessErrorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            content = {'status': 'Success'}
            return Response(content, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
