import os
import subprocess
from PIL import Image

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


def get_all_files_in_dir(root_dir_path):
    files_list = [os.path.join(dp, f) for dp, dn, filenames in os.walk(root_dir_path) for f in filenames if
                  os.path.splitext(f)[1] == '.jpg']
    count_total = len(files_list)


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
            # print("foo")
            proc = subprocess.run(["gm", "convert", pdf_file, "-quality", "100", outfile],
                                  check=True)  # on windows  shell=True


            # subprocess.check_output(command, stderr=subprocess.STDOUT)
    # do something with output
    except subprocess.CalledProcessError:
        print("we have errors")


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
