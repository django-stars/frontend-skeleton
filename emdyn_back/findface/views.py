import json
import os

import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import authentication, permissions




from fabric.api import local
from fabric.api import run, env
from rest_framework.views import APIView

from emdyn_back.findface.models import ProcessJob
from emdyn_back.findface.serializer import ProcessJobSerializer

import logging

emdynlogger = logging.getLogger(__name__)



env.hosts = ['host1', 'host2']


def prepare_deploy():
    local("./manage.py test my_app")
    local("git add -p && git commit")
    local("git push")





@api_view(['POST'])
def process_job(request):
    """
    Process a set of images and find any duplicates or image matches in local dataset

    for example with cur:
        curl -X POST -d '{"paths":["/some/path/folder"]}' http://127.0.0.1:8000/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"

    :param request: JSON array of images, single image or single path to folder
    :return: JSON object representing the process job and its result set
    """
    pass




def handle_error_message(error_string, error_source):
    pass



class StartProcessJob(APIView):
    """
    Process a set of images and find any duplicates or image matches in local dataset

    for example with cur:
        curl -X POST -d '{"paths":["/some/path/folder"]}' http://127.0.0.1:8000/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"

    :param request: JSON array of images, single image or single path to folder
    :return: JSON object representing the process job and its result set

    """

    authentication_classes = (authentication.TokenAuthentication,)

    # def get(self, request, process_id, format=None):
    #     """
    #     Parse incoming array of folders, images or single image
    #     :param request:
    #     :param format:
    #     :return:
    #     """
    #
    #     res = self.get_object(int(process_id))
    #     serializer = ProcessJobSerializer(res)
    #     return Response(serializer.data)

    def post(self, request, format=None):
        """
        Parse incoming array of folders, images or single image
        :param request:
        :param format:
        :return:
        """
        incoming_paths = request.data
        url_emdyn_onsite = "http://localhost:8000/api/v1/onsite/"

        user = request.user

        print(incoming_paths['paths'])
        print(user)

        mydata = {'user':request.user.pk, 'status': 'in-progress'}

        # onsite users token
        token= 'af073fd185bf7157fcaecd8ff7024851066ddfb3'



        headers = {"Authorization": "Token " + token}

        serializer = ProcessJobSerializer(data=mydata)
        emdynlogger.error(msg="more s")

        if serializer.is_valid():
            serializer.save()
            new_data = serializer.data
            start_content = {"paths": incoming_paths['paths'], "user": str(user), "process_id":new_data['id'],
                             "start_time": new_data['start_time']}  # , "process_info": proc_info}

            print(start_content)


            req_response = requests.request("post", url_emdyn_onsite, data=start_content, headers=headers)

            print(req_response.text)
            # parsed_response = req_response.json
            #
            # if req_response.status_code == 200:
            #     emdynlogger.error(msg= "foo all good or: {0}".format(parsed_response['reason']))
            #     status_intern = "OK"
            # else:
            #     emdynlogger.info(msg="darn {0}".format("somename Error: " + parsed_response["reason"]))
            #     status_intern = "Error: " + parsed_response["reason"]





            emdynlogger.error(msg="broken")
            return Response(data=start_content, status=status.HTTP_201_CREATED)
        else:
            emdynlogger.error(msg="broken2222")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        # ProcessJob.objects.get_or_create(user=request.user, status='in-progress')
        # ProcessJob.save(self)
        # proc_info = ProcessJob.objects.get(self)





        # from django.db.models import F
        # job = ProcessJob.objects.get(status='in-progress')
        # job.success_count = F('success_count') + 1
        # job.save()






# @api_view(http_method_names='GET')
# def get_status_message(request, *args, **kwargs):
#
#     process_id = request.query_params
#     process_value = ProcessJob.objects.get(pk=process_id).values()
#     file_count = process_value.total_image_count
#     files_done_count = process_value.success_images_count
#
#
#     current_status = {'files-processed': files_done_count, 'total-to-process': file_count}
#
#     return json.dumps(current_status)


# def image_meets_criteria(image_file):
#     # supported formats :JPEG, PNG, TIFF, WEBP
#     # max size 10 MB
#     # max resolution 4000 pix on biggest side
#
#     supported_formats = ('JPEG', 'PNG', 'TIFF', 'WEBP')
#
#     im = Image.open(image_file)
#
#     # 1MB = 1000000 Bytes
#     # os.path.getsize('/path/to/1234.jpg')
#
#     if im.size[0] or im.size[1] > 4000:  # max resolution 4000 pix on biggest side
#         return False
#     elif os.path.getsize(image_file) > 10000000:  # 10 MB in size ie. 1e7 bytes
#         return False
#     elif im.format not in supported_formats:
#         return False
#     else:
#         return True






# def find_matches():
#     # given a list of images run through the entire list
#
#     count = 0
#     image_list = requests.get("https://api.findface.pro/v0/faces/")
#     res = image_list['results']
#     len_res = len(res)  # number of faces in DB
#     a = FacenAPI('http://HOST:PORT', 'TOKEN')
#     for face in len_res:
#         photo_id = face['id']
#         photo = face['photo']
#
#         r = a.identify(photo, threshold='medium')
#
#         rnew = list(r['results'].keys())
#         key_now = rnew[0]
#
#         match_face_list = r['results'][key_now]
#
#         for match in match_face_list:
#             match_face_id = match['face']['id']
#             match_confidence = match['confidence']
#             match_meta = match['face']['meta']
#             match_photo = match['face']['photo']
#             match_thumb = match['face']['thumbnail']
#             match_timestamp = match['face']['timestamp']
#             match_face_gallery_list = match['face']['galleries']
#
#
#
#
#     pass

# import time
# def timing(f):
#     def wrap(*args):
#         time1 = time.time()
#         ret = f(*args)from rest_framework.response import Response
#         time2 = time.time()
#         print ('%s function took %0.3f ms' % (f.__name__, (time2-time1)*1000.0))
#         return ret
#     return wrap
#
#
# @timing
# def process_input_folder(folder_root_path):
#     # files_list = [os.path.join(dp, f) for dp, dn, filenames in os.walk(folder_root_path) for f in filenames if os.path.splitext(f)[1] == '.pdf']
#     # count_total = len(files_list)    for directory_path, directory_name, filenames in os.walk(folder_root_path):
#
#
#
#     for directory_path, directory_name, filenames in os.walk(folder_root_path):
#         for f in filenames:
#             if os.path.splitext(f)[1] == ".pdf":
#                 f_path = os.path.join(directory_path, f)
#                 pdf2jpeg(f_path)


# import cProfile
#
# cProfile.run('process_input_folder("/home/mdiener/Dropbox/00_GOMOGI")')
#



# @api_view(['POST'])
# def run_ff_face_api(request, image_path):
#     # process_input_folder("/home/mdiener/Dropbox/00_GOMOGI")
#
#
#     supported_file_types = (".JPEG", ".PNG", ".TIFF", ".WEBP")
#
#     # first find all pdfs anc convert
#     # next run through new list and push to api
#     # api_face(image_path)
#
#     if request.method == 'GET':
#         # d = request.data
#
#
#         return Response({"get": "thing"}, status=status.HTTP_400_BAD_REQUEST)
#
#     elif request.method == "POST":
#         # serializer = SnippetSerializer(data=request.data)
#         # if serializer.is_valid():
#         #     serializer.save()
#         # return Response(serializer.data, status=status.HTTP_201_CREATED)
#         # return Response({"some":"thing"}, status=status.HTTP_201_CREATED)
#
#         # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response({"post": "thing"}, status=status.HTTP_400_BAD_REQUEST)
