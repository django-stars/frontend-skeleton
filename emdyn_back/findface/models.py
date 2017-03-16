from django.db import models
# from emdyn_back.users.models import Organisation


class FaceProcess(models.Model):
    """
    On every batch run a log entry is stored here
    """

    # start-timestamp
    # end-timestamp
    # username
    # count success images processed
    # count failed image processed

    pass



class FaceList(models.Model):

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
