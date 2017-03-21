# -*- coding: utf-8 -*-
from django.conf.urls import url
from emdyn_back.findface import views

urlpatterns = [
    url(
        regex=r'^test/$',
        view=views.test,
        name='list'
    ),
    url(
        regex=r'^process/$',
        view=views.process_images,
        name='process-images'
    )



]
