# -*- coding: utf-8 -*-
from django.conf.urls import url
from emdyn_back.findface.views import StartProcessJob


urlpatterns = [
    url(
        regex=r'^process/$',
        view=StartProcessJob.as_view(),
        name='process-start'
    )




]
