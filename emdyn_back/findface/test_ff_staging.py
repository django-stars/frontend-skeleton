import requests

# https://35.187.51.87/v0/face

def api_face(request, photo_db_path):

    # create process object

    token = 'uztOvtq3S2XkbIVi_L9O4UNUz03uyLJm'
    ffserver_url = 'http://35.187.51.87/v0/'
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

                ProcessErrorLog.objects.create(error_source="FF", image_file_name=filename,
                                                error_reason=parsed_response["reason"])

                shutil.copy(photo_file_path, os.path.join(no_faces_dir, filename))
            progress_bar(i / total, line=filename + ", " + status)
