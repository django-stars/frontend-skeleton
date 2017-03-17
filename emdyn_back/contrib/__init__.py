"""
To understand why this file is here, please read:

http://cookiecutter-django.readthedocs.io/en/latest/faq.html#why-is-there-a-django-contrib-sites-directory-in-cookiecutter-django
"""
# -*- coding: utf-8 -*-
from django.contrib import admin
from django.utils.translation import ugettext_lazy



admin.site.site_title = ugettext_lazy('EMDYN site admin')
admin.site.site_header = ugettext_lazy('EMDYN administration')
admin.site.index_title = ugettext_lazy('EMDYN administration')
