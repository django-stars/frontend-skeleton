# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url, include
from emdyn_back.api.views import LoginEmdynObtainAuthToken
from emdyn_back.api.views import ProcessStatus, ErrorLog

urlpatterns = [
    url(
        regex=r'^findface/',
        view=include('emdyn_back.findface.urls'),
        name='findface'
    ),
    url(
        regex=r'^users/login/',
        view=LoginEmdynObtainAuthToken.as_view()
    ),
    url(
        regex=r'^process/error/',
        view=ErrorLog.as_view(),
        name='error-log'

    ),
    url(
        regex=r'^process/status/$',
        view=ProcessStatus.as_view(),
        name='process-status'
    )
]
