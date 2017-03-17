# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url, include

from emdyn_back.api.views import api_auth

urlpatterns = [
    url(
        regex=r'^findface/',
        view=include('emdyn_back.findface.urls'),
        name='findface'
    ),
    url(
        regex=r'^auth/$',
        view=api_auth,
        name='api-auth'
    )

]
