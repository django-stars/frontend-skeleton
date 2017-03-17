import os
import subprocess
from PIL import Image

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from emdyn_back.findface.models import FaceProcess
from emdyn_back.findface.api import FacenAPI, Face, FacenAPIError


def get_all_files_in_dir(root_dir_path):
    files_list = [os.path.join(dp, f) for dp, dn, filenames in os.walk(root_dir_path) for f in filenames if
                  os.path.splitext(f)[1] == '.jpg']
    count_total = len(files_list)


@api_view(http_method_names='GET')
def get_status_message(request, *args, **kwargs):

    process_id = request.query_params
    process_value = FaceProcess.objects.get(pk=process_id).values()
    file_count = process_value.total_image_count
    files_done_count = process_value.success_images_count


    current_status = {'files-processed': files_done_count, 'total-to-process': file_count}

    return json.dumps(current_status)




def image_meets_criteria(image_file):
    # supported formats :JPEG, PNG, TIFF, WEBP
    # max size 10 MB
    # max resolution 4000 pix on biggest side

    supported_formats = ('JPEG', 'PNG', 'TIFF', 'WEBP')

    im = Image.open(image_file)

    # 1MB = 1000000 Bytes
    # os.path.getsize('/path/to/1234.jpg')

    if im.size[0] or im.size[1] > 4000:  # max resolution 4000 pix on biggest side
        return False
    elif os.path.getsize(image_file) > 10000000:  # 10 MB in size ie. 1e7 bytes
        return False
    elif im.format not in supported_formats:
        return False
    else:
        return True


def pdf2jpeg(pdf_file):
    """

    :param pdf_file: full path and file name of PDF example:  /home/mdiener/1234.pdf
    :return:
    """

    outfile = pdf_file.split(".pdf")[0] + ".jpg"

    try:
        if outfile.split("/")[-1] == "img019.jpg":
            # print("found file image019.jpg")
            subprocess.run(["gm", "convert", pdf_file, "-quality", "100", outfile],
                                  check=True)  # on windows  shell=True



            # subprocess.check_output(command, stderr=subprocess.STDOUT)
    # do something with output
    except subprocess.CalledProcessError as e:
        print (e.output)

        if e.output.startswith('error: {'):
            error = json.loads(e.output[7:])  # Skip "error: "
            print(error['code'])
            print(error['message'])



def find_matches():
    # given a list of images run through the entire list

    count = 0
    image_list = requests.get("https://api.findface.pro/v0/faces/")
    res = image_list['results']
    len_res = len(res)  # number of faces in DB
    a = FacenAPI('http://HOST:PORT', 'TOKEN')
    for face in len_res:
        photo_id = face['id']
        photo = face['photo']

        r = a.identify(photo, threshold='medium')

        rnew = list(r['results'].keys())
        key_now = rnew[0]

        match_face_list = r['results'][key_now]

        for match in match_face_list:
            match_face_id = match['face']['id']
            match_confidence = match['confidence']
            match_meta = match['face']['meta']
            match_photo = match['face']['photo']
            match_thumb = match['face']['thumbnail']
            match_timestamp = match['face']['timestamp']
            match_face_gallery_list = match['face']['galleries']




    pass

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
def process_input_folder(folder_root_path):
    # files_list = [os.path.join(dp, f) for dp, dn, filenames in os.walk(folder_root_path) for f in filenames if os.path.splitext(f)[1] == '.pdf']
    # count_total = len(files_list)    for directory_path, directory_name, filenames in os.walk(folder_root_path):



    for directory_path, directory_name, filenames in os.walk(folder_root_path):
        for f in filenames:
            if os.path.splitext(f)[1] == ".pdf":
                f_path = os.path.join(directory_path, f)
                pdf2jpeg(f_path)


# import cProfile
#
# cProfile.run('process_input_folder("/home/mdiener/Dropbox/00_GOMOGI")')
#



@api_view(['POST'])
def run_ff_face_api(request, image_path):
    # process_input_folder("/home/mdiener/Dropbox/00_GOMOGI")


    supported_file_types = (".JPEG", ".PNG", ".TIFF", ".WEBP")

    # first find all pdfs anc convert
    # next run through new list and push to api
    # api_face(image_path)

    if request.method == 'GET':
        # d = request.data


        return Response({"get": "thing"}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "POST":
        # serializer = SnippetSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response({"some":"thing"}, status=status.HTTP_201_CREATED)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"post": "thing"}, status=status.HTTP_400_BAD_REQUEST)
