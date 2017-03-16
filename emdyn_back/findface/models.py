from django.db import models
from emdyn_back.users.models import Organisation
from users.models import User
from base.models import AppModel
# from emdyn_back.users.models import Organisation

class FaceProcess(AppModel):
    """
    On every batch run a log entry is stored here
    """

    # start-timestamp
    # end-timestamp
    # username
    # count success images processed
    # count failed image processed

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    success_images = models.IntegerField()
    failed_images = models.IntegerField()
    total_images = models.IntegerField()


    user = models.ForeignKey(User)

    # if multiple single image sellect pass array of paths


    pass



class FaceList(AppModel):

    # customer = models.ForeignKey(Organisation)
    # proccess_id = models.ForeignKey(FaceProcess)
    #
    # findface_face_id = models.IntegerField(name="findface unique face id")
    # findface_gallery = models.CharField(name="findface gallery name")
    # confidence = models.DecimalField(name="findface confidence value from 0 to 1")

    def count(self):
        # get the total number of images in this list
        pass


    pass
