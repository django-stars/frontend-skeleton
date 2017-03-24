import os
import sys

def get_all_files_in_dir(root_dir_path):
    files_list = [os.path.join(dp, f) for dp, dn, filenames in os.walk(root_dir_path) for f in filenames if
                  os.path.splitext(f)[1] == '.pdf']

    return files_list


all_pdfs_list = get_all_files_in_dir("/home/mdiener")

print(len(all_pdfs_list))
print(all_pdfs_list)
