from django.db import models
from emdyn_back.users.models import User
from emdyn_back.base.models import AppModel


class FaceProcess(AppModel):
    """
    On every batch run a log entry is stored here
    """

    # start-timestamp
    # end-timestamp
    # username
    # count success images processed
    # count failed image processed

    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(default=None, null=True, blank=True)
    success_images_count = models.IntegerField(default=None, null=True, blank=True)
    failed_images_count = models.IntegerField(default=None, null=True, blank=True)
    total_image_count = models.IntegerField(default=None, null=True, blank=True)

    owner = models.ForeignKey(User, related_name="faceprocess", on_delete=models.CASCADE)

    # if multiple single image sellect pass array of paths


    def is_completed(self, user):
        if self.end_time:
            return True
        else:
            return False

    class Meta:
        ordering = ['end_time']

    def __str__(self):
        return self.end_time


class FindFaceErrorLog(AppModel):
    ERROR_SOURCES = (
        ('FF', 'FindFace Face api'),
        ('GM', 'GraphicMagic PDF2JPG'),
        ('FR', 'FindFace Rotate'),
        ('FI', 'FindFace Identify'),
        ('FD', 'FindFace Detect'),

    )

    image_file_name = models.CharField(max_length=255)
    error_reason = models.CharField(max_length=255)
    # error_source
    error_source = models.CharField(max_length=255, choices=ERROR_SOURCES,
                                    help_text="indicate where the error originated from")
    face_process = models.ForeignKey(FaceProcess, on_delete=models.CASCADE)

    class Meta:
        ordering = ['image_name']

    def __str__(self):
        return self.image_file_name


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
