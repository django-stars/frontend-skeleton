# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from findface import views

urlpatterns = [
    url(
        regex=r'^~update/$',
        view=views.run_ff_face_api,
        name='list'
    )

]
