import binascii
import os
from datetime import date
from logging import Handler, Formatter, getLogger
import json
import datetime

import requests

from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _


def generate_key():
    return binascii.hexlify(os.urandom(20)).decode()


# class EmdynErrorFormatter(Formatter):
#     def __init__(self, task_name=None, task_source=None):
#         self.task_name = task_name
#         self.task_source = task_source
#
#         super(EmdynErrorFormatter, self).__init__()
#
#     def format(self, record):
#         data = {'message': record.msg,
#                 'timestamp': datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%fZ')}
#
#         if self.task_name:
#             data['@task_name'] = self.task_name
#
#         if self.task_source:
#             data['source'] = self.task_source
#
#         return json.dumps(data)


# class RequestsLogHandler(Handler):
#     def emit(self, record):
#         log_entry = self.format(record)
#         return requests.post('/error',
#                              log_entry, headers={"Content-type": "application/json"}).content


# class MyLogger:
#     def __init__(self,logger_name=None, error_source=None, error_level=None):
#         self.logger_name = logger_name
#         self.error_source = error_source
#         self.error_level = error_level
#
#
#     def __init_logging(self):
#         # http://masnun.com/2015/11/04/python-writing-custom-log-handler-and-formatter.html
#         self.logger = getLogger(self.logger_name.upper())
#         self.logger.setLevel(self.error_level)
#
#         handler = RequestsLogHandler()
#         formatter = EmdynErrorFormatter(self.logger_name.upper())
#         handler.setFormatter(formatter)
#         self.logger.addHandler(handler)


# class ProcessLogHandler(Handler): # Inherit from logging.Handler
#     def __init__(self):
#         # run the regular Handler __init__
#         Handler.__init__(self)
#
#     def emit(self, record):
#         # instantiate the model
#         try:
#             #NOTE: need to import this here otherwise it causes a circular reference and doesn't work
#             #  i.e. settings imports loggers imports models imports settings...
#             from emdyn_back.findface.models import ProcessErrorLog
#             logEntry = ProcessErrorLog(level=record.levelname, message=record.message, timestamp=datetime.datetime.now())
#             logEntry.save()
#         except:
#             pass
#
#         return


class EmdynModuleLicense(models.Model):
    name = models.CharField(max_length=255)
    key = models.CharField(_("Key"), max_length=40, default=generate_key)
    expiration_date = models.DateField(verbose_name="Date licence expires", null=True, blank=True)
    is_valid = models.BooleanField(default=True)
    created_on = models.DateTimeField(_("Created"), auto_now_add=True)


    def days_remaining(self):
        """
        count how many days until licence expires
        :return: number of days

        """

        d1 = date.today()

        if self.expiration_date is not None:
            d0 = self.expiration_date
        else:
            d0 = date(2019, 1, 25)

        delta = d0 - d1

        return delta.days

    class Meta:
        ordering = ['name']
        verbose_name = _("Emdyn Module License")
        verbose_name_plural = _("Emdyn Module Licenses")

    def __str__(self):
        return self.name


class EmdynToken(models.Model):
    """
    The default authorization token model.
    """
    license_key = models.ForeignKey(EmdynModuleLicense, related_name="emdyn_token")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='emdyn_token',
        on_delete=models.CASCADE, verbose_name=_("User")
    )
    created = models.DateTimeField(_("Created"), auto_now_add=True)

    class Meta:
        # Work around for a bug in Django:
        # https://code.djangoproject.com/ticket/19422
        #
        # Also see corresponding ticket:
        # https://github.com/tomchristie/django-rest-framework/issues/705
        verbose_name = _("Emdyn Asign Token")
        verbose_name_plural = _("Emdyn Asigned Tokens")
        unique_together = ("license_key", "user")

    def __str__(self):
        return str(self.user) or ""
