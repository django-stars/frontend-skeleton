from django.db import models
from django.db.models import signals
from model_utils.fields import AutoCreatedField, AutoLastModifiedField


class TimeStampedModel(models.Model):
    created = AutoCreatedField()
    modified = AutoLastModifiedField()

    class Meta:
        abstract = True


class AppQuerySet(models.QuerySet):
    def delete(self, **kwargs):
        return self.update(is_void=True)


class AppManager(models.Manager):
    queryset_class = AppQuerySet
    use_for_related_fields = True

    def get_queryset(self, exclude_void=True):
        q = self.queryset_class(self.model)
        if hasattr(self, 'core_filters'):
            q = q.filter(
                **self.core_filters
            )

        if exclude_void:
            q = q.exclude(is_void=True)
        return q

    def all_objects_including_void(self):
        return self.get_queryset(exclude_void=False)


class AppModel(models.Model):
    is_void = models.BooleanField(default=False)
    objects = AppManager()

    class Meta:
        abstract = True

    def delete(self, **kwargs):
        self.is_void = True
        self.save()
        signals.post_delete.send(
            sender=self.__class__, instance=self
        )
