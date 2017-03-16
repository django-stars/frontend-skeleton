import os,json,sys, shutil
import numpy as np
from PIL import Image
from skimage import io
import cv2

try:
    import requests
except ImportError:
    print("Cannot find 'requests' module. Please install it by running 'pip install requests' in terminal and try again.")
    sys.exit(0)

def progress_bar(percent, bar_length=20, line=""):
    hashes = '#' * int(np.ceil(percent * bar_length))
    spaces = ' ' * (bar_length - len(hashes))
    print("                                                                                                                    ", end="\r")
    print("Progress: [{0}] {1}% {2}".format(hashes + spaces, int(percent * 100), line), end="\r")

def rotator_api(photo):
    rotate_count = 0
    detect_result = api_detect(photo)
    if not "Error" in detect_result:
        dets = detect_result["faces"]
    else:
        return (False, detect_result)
    while len(dets) == 0 and rotate_count < 3:
        rotate_count += 1
        try:
            img = io.imread(photo)
        except ValueError as e:
            return (False, e)
        if img.ndim == 3 and img.shape[2] > 3:  # drop alpha channel
            img = img[:, :, :3].copy()
        img = cv2.transpose(img)
        img = cv2.flip(img, 1)  # transpose+flip(1)=CW
        mem_buf = cv2.imencode('.jpg', img)[1]
        bytes = np.array(mem_buf).tostring()
        dets = api_detect_bytes(bytes)["faces"]
    if len(dets) == 0:
        return (False, "No faces found after rotation")
    else:
        if rotate_count == 0:
            return (photo, "OK")
        else:
            rotated_photo = os.path.splitext(photo)[0] + "_rotated" + os.path.splitext(photo)[1]
            io.imsave(rotated_photo, img)
            return (rotated_photo, "OK")

def api_face(photo_db_path):
    global token
    global ffserver_url
    global mf_selector
    global face_gallery
    api_method = "/v0/face/"

    headers = {"Authorization": "Token " + token}
    url = ffserver_url + api_method

    i = 0
    total = int(len([name for name in os.listdir(photo_db_path) if os.path.isfile(os.path.join(photo_db_path, name))]))
    print(total)

    #for 1 photo per user
    with open(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv"), mode="w") as log:
        print("Report path: {0}".format(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv")))
        no_faces_dir = os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces")
        print("No faces dir: {0}".format(no_faces_dir))
        if not os.path.exists(no_faces_dir):
            os.mkdir(no_faces_dir)
        for filename in os.listdir(photo_db_path):
            i += 1
            photo_file_path = os.path.join(photo_db_path, filename)
            photo = {"photo": open(photo_file_path, "rb").read()}
            face_name = os.path.splitext(filename)[0]
            params = {"meta": face_name, "galleries": [face_gallery]}

            req_response = requests.request("post", url, files=photo, data=params, headers=headers)
            parsed_response = json.loads(req_response.text)

            if req_response.status_code == 200:
                log.write("{0};{1}\n".format(filename, "OK"))
                status = "OK"
            else:
                log.write("{0};{1}\n".format(filename, "Error: " + parsed_response["reason"]))
                status = "Error: " + parsed_response["reason"]
                shutil.copy(photo_file_path, os.path.join(no_faces_dir, filename))
            progress_bar(i / total, line=filename + ", " + status)


    #for photos in folders
    # with open(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv"), mode="w") as log:
    #     print(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv"))
    #     for folder in os.listdir(photo_db_path):
    #         for filename in os.listdir(os.path.join(photo_db_path, folder)):
    #             i += 1
    #             photo_file_path = os.path.join(photo_db_path, folder, filename)
    #             photo = {"photo": open(photo_file_path, "rb")}
    #             face_name = folder
    #             params = {"meta": face_name, "galleries": [face_gallery]}
    #
    #             req_response = requests.request("post", url, files=photo, data=params, headers=headers)
    #             parsed_response = json.loads(req_response.text)
    #
    #             if req_response.status_code == 200:
    #                 log.write("{0};{1}\n".format(filename, "OK"))
    #                 status = "OK"
    #             else:
    #                 log.write("{0};{1}\n".format(filename, "Error: " + parsed_response["reason"]))
    #                 status = "Error: " + parsed_response["reason"]
    #             progress_bar(i / total, line=filename + ", " + status)

def api_face_with_rotate(photo_db_path):
    global token
    global ffserver_url
    global mf_selector
    global face_gallery
    api_method = "/v0/face/"

    headers = {"Authorization": "Token " + token}
    url = ffserver_url + api_method

    i = 0
    total = int(
        len([name for name in os.listdir(photo_db_path) if os.path.isfile(os.path.join(photo_db_path, name))]))
    print(total)

    # for 1 photo per user
    with open(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv"), mode="w") as log:
        print(
        "Report path: {0}".format(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv")))
        no_faces_dir = os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces")
        print("No faces dir: {0}".format(no_faces_dir))
        if not os.path.exists(no_faces_dir):
            os.mkdir(no_faces_dir)
        for filename in os.listdir(photo_db_path):
            i += 1
            photo_file_path = os.path.join(photo_db_path, filename)
            photo_file_path = rotator_api(photo_file_path)
            if not photo_file_path[0]:
                log.write("{0};{1}\n".format(filename, photo_file_path[1]))
                status = photo_file_path[1]
                shutil.copy(os.path.join(photo_db_path, filename), os.path.join(no_faces_dir, filename))
                progress_bar(i / total, line=filename + ", " + status)
                continue
            photo = {"photo": open(photo_file_path[0], "rb").read()}
            face_name = os.path.splitext(filename)[0].replace("_rotated", "")
            params = {"meta": face_name, "galleries": [face_gallery]}

            req_response = requests.request("post", url, files=photo, data=params, headers=headers)
            parsed_response = json.loads(req_response.text)

            if req_response.status_code == 200:
                log.write("{0};{1}\n".format(filename, "OK"))
                status = "OK"
            else:
                log.write("{0};{1}\n".format(filename, "Error: " + parsed_response["reason"]))
                status = "Error: " + parsed_response["reason"]
                shutil.copy(photo_file_path[0], os.path.join(no_faces_dir, filename))
            progress_bar(i / total, line=filename + ", " + status)


            # for photos in folders
            # with open(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv"), mode="w") as log:
            #     print(os.path.join(os.path.dirname(os.path.abspath(photo_db_path)), "no_faces.csv"))
            #     for folder in os.listdir(photo_db_path):
            #         for filename in os.listdir(os.path.join(photo_db_path, folder)):
            #             i += 1
            #             photo_file_path = os.path.join(photo_db_path, folder, filename)
            #             photo = {"photo": open(photo_file_path, "rb")}
            #             face_name = folder
            #             params = {"meta": face_name, "galleries": [face_gallery]}
            #
            #             req_response = requests.request("post", url, files=photo, data=params, headers=headers)
            #             parsed_response = json.loads(req_response.text)
            #
            #             if req_response.status_code == 200:
            #                 log.write("{0};{1}\n".format(filename, "OK"))
            #                 status = "OK"
            #             else:
            #                 log.write("{0};{1}\n".format(filename, "Error: " + parsed_response["reason"]))
            #                 status = "Error: " + parsed_response["reason"]
            #             progress_bar(i / total, line=filename + ", " + status)

def api_detect(photo):
    api_method = "/v0/detect/"
    headers = {"Authorization": "Token " + token}
    url = ffserver_url + api_method
    photo = {"photo": open(photo, "rb")}
    params = {"mf_selector": "all"}
    requests_response = requests.request("post", url, files=photo, data=params, headers=headers)
    parsed_response = json.loads(requests_response.text)
    if requests_response.status_code == 200:
        return (parsed_response)
    else:
        return ("Error: " + parsed_response["reason"])

def api_detect_bytes(bytes):
    api_method = "/v0/detect/"
    headers = {"Authorization": "Token " + token}
    url = ffserver_url + api_method
    photo = {"photo": bytes}
    params = {"mf_selector": "all"}
    requests_response = requests.request("post", url, files=photo, data=params, headers=headers)
    parsed_response = json.loads(requests_response.text)
    if requests_response.status_code == 200:
        return (parsed_response)
    else:
        return ("Error: " + parsed_response["reason"])

if __name__ == "__main__":
    # Mandatory parameters
    # token = "MnnsmBvALum1hOLUqneAT5p1ZqJzcGUm" #change to your API token
    token = "bfBlnIum0QcJX_uJ2YddMRg4TDVRfR39"
    ffserver_url = "http://127.0.0.1:8000"
    photo_db_path = "/path/to/photo"  # change to name of directory with photos to be uploaded

    # Optional parameters
    face_gallery = "default"  # change to desired gallery name
    mf_selector = "biggest"  # one of "reject", biggest", "all"
    api_face(photo_db_path)

