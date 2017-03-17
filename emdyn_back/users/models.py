# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser, UserManager
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from emdyn_back.api.models import EmdynModuleLicense

from rest_framework.authtoken.models import Token


class Organisation(models.Model):
    name = models.CharField(max_length=200,
                            help_text=_("The name of the organization"))
    is_active = models.BooleanField(default=True)
    token = models.ForeignKey(EmdynModuleLicense, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=200,
                            help_text=_("The name of the organization"))
    is_active = models.BooleanField(default=True)
    organisation = models.ForeignKey(Organisation)


    class Meta:
        ordering = ['organisation', 'name']

    def __str__(self):
        return self.name


class User(AbstractUser):
    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_('Name of User'), blank=True, max_length=255)
    email = models.EmailField(max_length=255, unique=True)

    license_key = models.ForeignKey(EmdynModuleLicense, null=True, blank=True)

    organisation = models.ForeignKey(Organisation, blank=True, null=True)
    department = models.ForeignKey(Department, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)

    def __str__(self):
        return self.email

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'email': self.email})
