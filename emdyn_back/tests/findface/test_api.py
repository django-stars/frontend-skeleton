from test_plus import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework.compat import set_many
import base64

# from tests.models import BasicModel

from users.models import User
from django.contrib.auth.models import Group, Permission

from rest_framework import (
    HTTP_HEADER_ENCODING, authentication, generics, permissions, serializers,
    status
)

factory = APIRequestFactory()

def basic_auth_header(username, password):
    credentials = ('%s:%s' % (username, password))
    base64_credentials = base64.b64encode(credentials.encode(HTTP_HEADER_ENCODING)).decode(HTTP_HEADER_ENCODING)
    return 'Basic %s' % base64_credentials


class DataConversionTests(TestCase):

    def setUp(self):
        User.objects.create_user('disallowed', 'disallowed@example.com', 'password')
        user = User.objects.create_user('permitted', 'permitted@example.com', 'password')
        set_many(user, 'user_permissions', [
            Permission.objects.get(codename='add_basicmodel'),
            Permission.objects.get(codename='change_basicmodel'),
            Permission.objects.get(codename='delete_basicmodel')
        ])
        user = User.objects.create_user('updateonly', 'updateonly@example.com', 'password')
        set_many(user, 'user_permissions', [
            Permission.objects.get(codename='change_basicmodel'),
        ])

        self.permitted_credentials = basic_auth_header('permitted', 'password')
        self.disallowed_credentials = basic_auth_header('disallowed', 'password')
        self.updateonly_credentials = basic_auth_header('updateonly', 'password')

        BasicModel(text='foo').save()

    def test_convert_pdf_to_jpg(self):
        request = factory.post('/', {'pdf': '/path/to/file.pdf'}, format='json',
                               HTTP_AUTHORIZATION=self.permitted_credentials)
        response = get_queryset_list_view(request, pk=1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
