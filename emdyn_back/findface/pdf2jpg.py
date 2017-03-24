#!/usr/bin/env python
import os
import optparse
from subprocess import call


# def main():
#     p = optparse.OptionParser()
#     p.add_option('--path', '-p', default="world")
#     options, arguments = p.parse_args()
#     print('Hello %s' % options.person)
#
#     options, arguments = p.parse_args()
#     if len(arguments) == 1:
#         pass
#     else:
#       p.print_help()
#
# if __name__ == '__main__':
#     main()


def get_all_files_in_dir(root_dir_path):

    files_list = [os.path.join(dp, f) for dp, dn, filenames in os.walk(root_dir_path) for f in filenames if os.path.splitext(f)[1] == '.pdf']

    return files_list


def is_filename_unique(filename, file_name_list):
    if filename in file_name_list:
        print("Error:  and image with the same name was already registered in the system")
        return False
    else:
        return True


def copy_to_server(file_list):
    supported_formats = ('JPG', 'JPEG', 'PNG', 'TIFF', 'WEBP', 'PDF')

    path_temp_folder_dell_server = "G:\\folder\\temp\\"

    file_count= 0
    folder_count = 0

    new_dir = "tmp_" + str(folder_count)

    print("create new dir called: " + str(new_dir))

    f_names = []

    for file in file_list:

        filename = file[-4:] # gets last 4 characters   ".jpg"

        if file.upper().endswith(supported_formats):

            f_names.append(filename)

            file_count += 1
            if file_count == 10 :
                file_count = 0
                folder_count += 1
                new_dir = "tmp_" + str(folder_count)

                print("create new dir called: " + str(new_dir))

            #call(["xcopy", file, path_temp_folder_dell_server + str(new_dir) + "\\" + file, "/K/O/X"])
            print("file to copy is : " + file + " filenum " + str(file_count) + " : copy to this folder: " + path_temp_folder_dell_server + str(new_dir) + "\\" + file)
        else:
            print("Error:  Sorry this file type" + str(file.upper().endswith(supported_formats)
                    + " is not a supported one of our supported formats listed here: " + supported_formats))

def temp_file_list():
    tmp_list = []

    for x in range(106):
        tmp_list.append("coolFileName_" + str(x) )

    return tmp_list
        # print(x)
    # print(tmp_list)

copy_to_server(temp_file_list())

        # call(["xcopy", "c:\\file.txt", "G:\\file.txt", "/K/O/X"])
        #



# create /temp folder on Server machine to store images for processing
# delete all images on /temp folder upon completion "sucess"




# 01- create list of all pdfs and images in all subfolders, log error if list create fails
# 02- copy all pdfs and images to server, log error if copy fails
# 03- convert all pdfs 2 jpg using command line tool  "gm" graphicsmagic with subprocess call, log errors
# 04- run Rotation check on all images, rotate images, save with new filename _rotated
# 05- create new master list of all images to process
# 06- run FACE registration on all images into system  /face   ff call
# 07- run find all matches, ie loop over entire image list passing to FF  /identify call
# 08- store ONLY images that were found to have a match
# 09- return process-job details with list of matched images, list of errors, process-job-details


#
# def copy_files_to_server(orig_folder):
#
#
#
# def taskRunPdf2Jpg():
#     run(pdf2jpeg(pdf_file))
#
#
# def pdf2jpeg(pdf_file):
#     """
#
#     :param pdf_file: full path and file name of PDF example:  /home/mdiener/1234.pdf
#     :return:
#     """
#
#     outfile = pdf_file.split(".pdf")[0] + ".jpg"
#
#     try:
#         if outfile.split("/")[-1] == "img019.jpg":
#             # print("found file image019.jpg")
#             subprocess.run(["gm", "convert", pdf_file, "-quality", "100", outfile],
#                                   check=True)  # on windows  shell=True
#
#
#
#     # subprocess.check_output(command, stderr=subprocess.STDOUT)
#     # do something with output
#     except subprocess.CalledProcessError as e:
#         print (e.output)
#
#         if e.output.startswith('error: {'):
#             error = json.loads(e.output[7:])  # Skip "error: "
#             print(error['code'])
#             print(error['message'])

