import os
import requests

# test curl api call
# curl -X POST -d "['/some/path/folder/image1.jpg','/some/path/folder/image2.jpg']" http://127.0.0.1:8000/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f'
# curl -X POST -d '{"paths":["/some/path/folder/image1.jpg","/some/path/folder/image2.jpg"]}' http://127.0.0.1:8000/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"

# sample call multiple images
# curl -X POST -d '{"paths":["/some/path/folder/image1.jpg","/some/path/folder/image2.jpg"]}' http://127.0.0.1:8000/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"

# single image call
# curl -X POST -d '{"paths":["/some/path/folder/image1.jpg"]}' http://127.0.0.1:8000/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"

# single folder call
# curl -X POST -d '{"paths":["/some/path/folder"]}' http://127.0.0.1:8000/api/v1/findface/process/ -H 'Authorization: Token 479bf16ecba43727c5d119fa09e14d8475432b4f' -H "Content-Type: application/json"


# print("first item in list ind")
# print(ind[0])
# content = {"name":is_file}
#
# foo1 = {"name":{"[/some/path/folder1]":""}}
# foo2 = {"name":{"[/some/path/folder/image1.jpg]":""}}
# foo3 = {"name":{"[/some/path/folder/image1.jpg,/some/path/folder/image2.jpg]":""}}


data_login = [
  ('username', 'm.diener@gomogi.com'),
  ('password', 'air21mrd'),
]

url_login = 'http://127.0.0.1:8010/api/v1/users/login/'

res_login = requests.post(url_login, data=data_login)

print(res_login.text)
##################################################################
###################   request to start process job    ############
##################################################################

headers_backend = {
    'Authorization': 'Token 479bf16ecba43727c5d119fa09e14d8475432b4f',
    'Content-Type': 'application/json',
}

url_back = "http://127.0.0.1:8010/api/v1/findface/process/"

data_back = '{"paths":["/home/mdiener/Downloads/training-originals"]}'
# data_back = '{"paths":["/home/mdiener/Downloads/training-originals/0002_1.jpg"]}'
# data_back = '{"paths":["/home/mdiener/Downloads/training-originals/0002_1.jpg", "/home/mdiener/Downloads/training-originals/0002_2.jpg"]}'

res_back = requests.post(url_back, headers=headers_backend, data=data_back)
print("now getting findface/process call: " + res_back.text)


##################################################################
###################   request to get status    ############
##################################################################

# data_get = {"process_id": 31}
#
#
# res_back_get = requests.post(url_back, headers=headers_backend, params=data_get)
# print(res_back_get.text)

##################################################################
###################   request to get status    ############
##################################################################


# headers_onsite = {
#     'Authorization': 'Token af073fd185bf7157fcaecd8ff7024851066ddfb3',
#     'Content-Type': 'application/json',
# }
#
# url_onsite = 'http://127.0.0.1:8000/api/v1/onsite/'
# data_onsite = '{"process_id": 23, "user": "m.diener@gomogi.com", "paths": ["/home/mdiener/Downloads/training-originals"], "start_time": "2017-03-24T15:29:15.157076Z"}'
# res_onsite = requests.post(url_onsite, headers=headers_onsite, data=data_onsite)
#
# print(res_onsite.text)


def call_login():
    # r = requests.get('http://localhost:8000', auth=('user', 'pass'))
    #
    # rp = requests.post(url="http://localhost:8000", json={"some":"jsondata"}, headers=header)
    #
    # resp = requests.post(url, files=photo, data=params, headers=headers)

    pass

def pass_paths():

    pass


def start_process():

    pass


def get_all_files_in_dir(root_dir_path):
    files_list = [os.path.join(dp, f) for dp, dn, filenames in os.walk(root_dir_path) for f in filenames if
                  os.path.splitext(f)[1] == '.pdf']

    return files_list


# all_pdfs_list = get_all_files_in_dir("/home/mdiener")

# print(len(all_pdfs_list))
# print(all_pdfs_list)
