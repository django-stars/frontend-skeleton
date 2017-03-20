# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url, include
from emdyn_back.api.views import LoginEmdynObtainAuthToken

urlpatterns = [
    url(
        regex=r'^findface/',
        view=include('emdyn_back.findface.urls'),
        name='findface'
    ),
    url(
        regex=r'^users/login/',
        view=LoginEmdynObtainAuthToken.as_view()
    )
]
