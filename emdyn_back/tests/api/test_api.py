from rest_framework.test import force_authenticate
from rest_framework.test import APIRequestFactory

from emdyn_back.users.models import User
from emdyn_back.users.views import ListView

factory = APIRequestFactory()
user = User.objects.get(username='mdiener')
view = ListView.as_view()

# Make an authenticated request to the view...
request = factory.get('/api/v0/test/')
force_authenticate(request, user=user)
response = view(request)
