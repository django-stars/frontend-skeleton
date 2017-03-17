from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from emdyn_back.users.models import User
from emdyn_back.api.models import EmdynToken


@api_view(['GET'])
def api_auth(request, **kwargs):

    username = str(request.user)
    user_token = str(request.auth)

    user = User.objects.get(email=username)

    emdyn_tokens = EmdynToken.objects.filter(user=user)

    my_lics = []

    for x in emdyn_tokens:
        new_lic = {}
        new_lic['name'] = x.license_key.name
        new_lic['license'] = x.license_key.key
        new_lic['expires-on'] = x.license_key.expiration_date
        my_lics.append(new_lic)

    content = {'username': username, 'user_token': user_token, 'licenses': my_lics}

    return Response(content, status=status.HTTP_200_OK)
