# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from emdyn_back.findface.models import ProcessJob
from emdyn_back.findface.models import ProcessErrorLog
from emdyn_back.findface.models import FaceMatchList

from django.contrib import admin


@admin.register(ProcessJob)
class ProcessJobAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_time', 'end_time', 'success_count',
                    'error_count', 'total_count', 'matches', 'user',
                    'is_completed', 'status')
    search_fields = ['user']
    readonly_fields = ('start_time',)


@admin.register(FaceMatchList)
class FaceListAdmin(admin.ModelAdmin):
    list_display = ('image_name', 'created_on', 'process', 'matches_count')
    search_fields = ['process', 'image_name']


@admin.register(ProcessErrorLog)
class ProcessErrorLogAdmin(admin.ModelAdmin):
    list_display = ('image_name', 'error_message', 'error_source')
    search_fields = ['image_name', 'error_message']
