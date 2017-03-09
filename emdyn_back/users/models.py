# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import

from django.contrib.auth.models import AbstractUser, UserManager
from django.core.urlresolvers import reverse
from django.db import models
from django.utils.translation import ugettext_lazy as _
from base.models import AppModel, TimeStampedModel


class Organisation(models.Model, AppModel, TimeStampedModel):
    name = models.CharField(max_length=200,
                            help_text=_("The name of the organization"))
    is_active = models.BooleanField(default=True)

    token = models.CharField(max_length=200, null=True, blank=True, default=None,
                             verbose_name=_("token"))

    def is_member(self, user):
        return True if user in self.users.all() else False

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Department(models.Model, AppModel, TimeStampedModel):
    name = models.CharField(max_length=200,
                            help_text=_("The name of the organization"))
    is_active = models.BooleanField(default=True)
    organization = models.ForeignKey(Organisation)

    token = models.CharField(max_length=200, null=True, blank=True, default=None,
                             verbose_name=_("token"))

    def is_member(self, user):
        return True if user in self.users.all() else False

    class Meta:
        ordering = ['organisation', 'name']

    def __str__(self):
        return self.name


class User(AbstractUser, AppModel, TimeStampedModel):
    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_('Name of User'), blank=True, max_length=255)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        help_text=_('Required, must be a valid email address'),
    )

    token = models.CharField(max_length=200, null=True, blank=True, default=None,
                             verbose_name=_("token"))

    organisation = models.ForeignKey(Organisation, blank=True)
    department = models.ForeignKey(Department, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'username': self.username})
