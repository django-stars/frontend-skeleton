from django.db import models
from django.contrib.postgres.fields import JSONField
from emdyn_back.users.models import User
from emdyn_back.base.models import AppModel


class FaceProcess(AppModel):
    """
    On every batch run a log entry is stored here
    """
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(default=None, null=True, blank=True)
    success_process_count = models.IntegerField(verbose_name="successfully processed images count",
                                                default=None, null=True, blank=True) # represents processed amount
    failed_process_count = models.IntegerField(verbose_name="failed images count",
                                               default=None, null=True, blank=True) # failed images count
    total_image_count = models.IntegerField(verbose_name="Total amount of images provided",
                                            help_text="total number of images submitted to process",
                                            default=None, null=True, blank=True)

    total_matched = models.IntegerField(verbose_name="number of image matches found", default=None, null=True, blank=True)
    user = models.ForeignKey(User, related_name="faceprocess", on_delete=models.CASCADE)


    def is_completed(self, user):
        if self.end_time:
            return True
        else:
            return False

    class Meta:
        ordering = ['end_time']

    def __str__(self):
        return self.end_time


class ErrorLog(AppModel):
    ERROR_SOURCES = (
        ('FF', 'FindFace Face api'),
        ('GM', 'GraphicMagic PDF2JPG'),
        ('FR', 'FindFace Rotate'),
        ('FI', 'FindFace Identify'),
        ('FD', 'FindFace Detect'),

    )

    image_file_name = models.CharField(max_length=255)
    error_message = models.CharField(verbose_name="Error message", max_length=255)
    # error_source
    error_source = models.CharField(max_length=255, choices=ERROR_SOURCES,
                                    help_text="indicate where the error originated from")
    error_timestamp = models.DateTimeField(auto_now=True)
    face_process = models.ForeignKey(FaceProcess, on_delete=models.CASCADE)

    class Meta:
        ordering = ['error_timestamp', 'image_name']

    def __str__(self):
        return self.image_file_name or ""


class FaceList(AppModel):
    user = models.ForeignKey(User)
    proccess_id = models.ForeignKey(FaceProcess, on_delete=models.CASCADE)
    findface_id = models.IntegerField(name="FindFace internal image id")
    findface_gallery = models.CharField(name="FindFace gallery name", max_length=255)

    confidence = models.DecimalField(name="findface confidence value from 0 to 1")

    def count(self):
        # get the total number of images in this list
        pass

    class Meta:
        ordering = ['end_time']

    def __str__(self):
        return self.end_time


class FaceListMatches(AppModel):
    # internal id  Django
    proccess_id = models.ForeignKey(FaceProcess, on_delete=models.CASCADE)
    image_name = models.CharField(verbose_name="unique file name", max_length=255)
    findface_id = models.IntegerField(name="FindFace internal image id")
    findface_gallery = models.CharField(name="FindFace gallery name", max_length=255)

    findface_matches = JSONField(verbose_name="array of images and their details that match this image", db_index=True)


    class Meta:
        ordering = ['process_id', 'image_name']

    def __str__(self):
        return self.image_name or ""
