# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

# from emdyn_back.users.views import UserList, UserDetail
from emdyn_back.users import views
from django.conf.urls import url


urlpatterns = [
    url(
        regex=r'^$',
        view=views.UserListView.as_view(),
        name='list'
    ),
    url(
        regex=r'^~redirect/$',
        view=views.UserRedirectView.as_view(),
        name='redirect'
    ),
    url(
        regex=r'^(?P<username>[\w.@+-]+)/$',
        view=views.UserDetailView.as_view(),
        name='detail'
    ),
    url(
        regex=r'^~update/$',
        view=views.UserUpdateView.as_view(),
        name='update'
    )
    # url(
    #     regex=r'^list/$',
    #     view=UserList.as_view(),
    #     name='list'
    # ),
    # url(
    #     regex=r'^(?P<pk>[0-9])+/$',
    #     view=UserDetail.as_view(),
    #     name='detail'
    # ),
]

