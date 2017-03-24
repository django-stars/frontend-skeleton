import os
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')




# curl -X POST -d '{"paths":["/some/path/folder/image1.jpg","/some/path/folder/image2.jpg"]}' http://127.0.0.1:8010/api/v1/findface/process/  -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"
# curl -X POST -d '{"paths":["/home/mdiener/Downloads/training-originals"]}' http://127.0.0.1:8010/api/v1/findface/process/  -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"


# login test url
# curl -X POST -d "username=someUserName&password=secretPassword" http://127.0.0.1:8000/api/v1/users/login/

try:
    from django.core.management import execute_from_command_line
except ImportError:
    # The above import may fail for some other reason. Ensure that the
    # issue is really that Django is missing to avoid masking other
    # exceptions on Python 2.
    try:
        import django  # noqa
    except ImportError:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        )
    raise




from rest_framework.test import APIRequestFactory
import base64

from rest_framework import (
    HTTP_HEADER_ENCODING, authentication, generics, permissions, serializers,
    status
)

factory = APIRequestFactory()

def basic_auth_header(username, password):
    credentials = ('%s:%s' % (username, password))
    base64_credentials = base64.b64encode(credentials.encode(HTTP_HEADER_ENCODING)).decode(HTTP_HEADER_ENCODING)
    return 'Basic %s' % base64_credentials





request = factory.post('/notes/', {'title': 'new idea'})







# class DataConversionTests(TestCase):
#
#     def setUp(self):
#         User.objects.create_user('disallowed', 'disallowed@example.com', 'password')
#         user = User.objects.create_user('permitted', 'permitted@example.com', 'password')
#         set_many(user, 'user_permissions', [
#             Permission.objects.get(codename='add_basicmodel'),
#             Permission.objects.get(codename='change_basicmodel'),
#             Permission.objects.get(codename='delete_basicmodel')
#         ])
#         user = User.objects.create_user('updateonly', 'updateonly@example.com', 'password')
#         set_many(user, 'user_permissions', [
#             Permission.objects.get(codename='change_basicmodel'),
#         ])
#
#         self.permitted_credentials = basic_auth_header('permitted', 'password')
#         self.disallowed_credentials = basic_auth_header('disallowed', 'password')
#         self.updateonly_credentials = basic_auth_header('updateonly', 'password')
#
#         BasicModel(text='foo').save()
#
#     def test_convert_pdf_to_jpg(self):
#         request = factory.post('/', {'pdf': '/path/to/file.pdf'}, format='json',
#                                HTTP_AUTHORIZATION=self.permitted_credentials)
#         response = get_queryset_list_view(request, pk=1)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
