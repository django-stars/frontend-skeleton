import binascii
import os
from datetime import date

from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _


def generate_key():
    return binascii.hexlify(os.urandom(20)).decode()


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
        return "foo"
