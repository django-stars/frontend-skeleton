import binascii
import os
from datetime import date

from django.db import models
from django.utils.translation import ugettext_lazy as _


class EmdynModuleLicence(models.Model):
    name = models.CharField(max_length=255)
    key = models.CharField(_("Key"), max_length=40, primary_key=True)
    expiration_date = models.DateField(verbose_name="Date licence expires", null=True, blank=True)
    is_valid = models.BooleanField(default=True)
    created_on = models.DateTimeField(_("Created"), auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super(EmdynModuleLicence, self).save(*args, **kwargs)

    def generate_key(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def days_remaining(self):
        """
        count how many days until licence expires
        :return:
        """

        d1 = date.today()

        if self.expiration_date is not None:
            d0 = self.expiration_date
        else:
            d0 = date(2019,1,25)

        delta = d0 - d1

        return delta.days

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
