from django.core import signals
from django.db import models
from django.contrib.postgres.fields import JSONField
from emdyn_back.users.models import User

from model_utils.fields import StatusField
from model_utils import Choices


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


class ProcessJob(AppModel):
    """
    On every batch run a log entry is stored here
    """

    STATUS_CHOICES = Choices('in-progress', 'success', 'failed')

    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(default=None, null=True, blank=True)
    success_count = models.IntegerField(verbose_name="successfully processed images count",
                                        default=None, null=True, blank=True)  # represents processed amount
    error_count = models.IntegerField(verbose_name="failed images count",
                                      default=None, null=True, blank=True)  # failed images count
    total_count = models.IntegerField(verbose_name="Total amount of images provided",
                                      help_text="total number of images submitted to process",
                                      default=None, null=True, blank=True)

    matches = models.IntegerField(verbose_name="number of image matches found", default=None, null=True, blank=True)

    status = StatusField(choices_name='STATUS_CHOICES')

    user = models.ForeignKey(User, related_name="processjob", on_delete=models.CASCADE)

    def is_completed(self):
        if self.end_time:
            return True
        else:
            return False

    class Meta:
        ordering = ['id', 'end_time']

    def __str__(self):
        return str(self.id)


class ProcessErrorLog(AppModel):
    ERROR_SOURCES = (
        ('FF', 'FindFace Face api'),
        ('GM', 'GraphicMagic PDF2JPG'),
        ('FR', 'FindFace Rotate'),
        ('FI', 'FindFace Identify'),
        ('FD', 'FindFace Detect'),

    )

    image_name = models.CharField(max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)
    error_message = models.CharField(verbose_name="Error message", max_length=255)
    error_source = models.CharField(max_length=255, choices=ERROR_SOURCES,
                                    help_text="indicate where the error originated from")

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    process = models.ForeignKey(ProcessJob, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_on', 'image_name']

    def __str__(self):
        return self.image_file_name or ""


class FaceMatchList(AppModel):
    image_name = models.CharField(verbose_name="unique file name", max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)
    findface_id = models.IntegerField(name="FindFace internal image id")
    findface_gallery = models.CharField(name="FindFace gallery name", max_length=255)

    findface_matches = JSONField(verbose_name="array of images and their details that match this image", db_index=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    process = models.ForeignKey(ProcessJob, on_delete=models.CASCADE)

    def matches_count(self):
        return len(self.findface_matches)

    class Meta:
        ordering = ['process', 'image_name']

    def __str__(self):
        return self.image_name or ""
