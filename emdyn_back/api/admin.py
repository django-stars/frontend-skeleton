# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals
from emdyn_back.api.models import EmdynModuleLicense
from emdyn_back.api.models import EmdynToken

from django.contrib import admin


@admin.register(EmdynModuleLicense)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ('name', 'key', 'expiration_date', 'is_valid', 'created_on', 'days_remaining')
    search_fields = ['name']
    readonly_fields = ('key',)


@admin.register(EmdynToken)
class EmdynTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'license_key',)
    search_fields = ['user']

