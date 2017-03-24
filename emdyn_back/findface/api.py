#!/usr/bin/env python3
import requests
import json
import datetime
import dateutil.parser

# base type: bounded box
class BBox:
    def __init__(self, x1, y1, x2, y2):
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2

    def __repr__(self):
        return str(self)

    def __str__(self):
        return 'BBox(%d,%d,%d,%d)' % (self.x1, self.y1, self.x2, self.y2)

    @classmethod
    def fromJson(cls, d):
        return cls(int(d['x1']), int(d['y1']), int(d['x2']), int(d['y2']))

    @classmethod
    def fromString(cls, s):
        c = json.loads(s)
        return cls(int(c[0]), int(c[1]), int(c[2]), int(c[3]))

# base type: face
class Face:
    def __init__(self, face_id, photo, timestamp, photo_hash, bbox, person_id = None, meta = None, galleries = None, cam_id = None):
        self.id = int(face_id)
        self.photo = photo
        self.person_id = None if person_id is None else int(person_id)
        self.timestamp = dateutil.parser.parse(timestamp)
        self.photo_hash = bytearray.fromhex(photo_hash)
        self.box = bbox
        self.meta = meta
        self.galleries = galleries
        self.cam_id = cam_id

    def __repr__(self):
        return str(self)

    def __str__(self):
        s = 'id = %d, timestamp = "%s", photo = "%s", photo_hash = %s, box = %s' % (self.id, self.timestamp.isoformat(), self.photo,
            ''.join('{:02x}'.format(x) for x in self.photo_hash), self.box)
        if self.person_id is not None:
            s += ', person_id = %d' % (self.person_id)
        if self.meta is not None:
            s += ', meta = "%s"' % (self.meta)
        if self.cam_id is not None:
            s += ', cam_id = "%s"' % (self.cam_id)
        if self.galleries is not None and len(self.galleries) > 0:
            s += ', galleries: ["' + '", "'.join(self.galleries) + '"]'
        return 'Face(' + s + ')'

    @classmethod
    def fromJson(cls, d):
        return cls(d['id'], d['photo'], d['timestamp'], d['photo_hash'], BBox.fromJson(d),
            person_id = d.get('person_id'),
            meta = d.get('meta'), galleries = d.get('galleries'), cam_id = d.get('cam_id'))

# helper for json serialization
class encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        return json.JSONEncoder.default(self, obj)

class FacenAPIError(Exception):
    def __init__(self, code, error):
       self.code, self.error = code, error

# some facen api requests
class FacenAPI:
    def __init__(self, url, token):
        self.baseurl = url
        self.token = token

    def do_post(self, func, **args):
        params = dict()
        files = dict()
        for k, v in args.items():
            if v is not None:
                if hasattr(v, 'read') or isinstance(v, (bytes, tuple)):
                    files[k] = v
                else:
                    params[k] = v
        res = requests.post(self.baseurl + func,
            headers = {'Authorization': 'Token '+ self.token},
            files = files,
            data = params)
        if res.status_code >= 400:
            raise FacenAPIError(res.status_code, res.json())
        return res.json()

    # returns array of bboxes
    def detect(self, photo_url):
        doc = self.do_post('/v0/detect', photo = photo_url)
        result = []
        if (doc.get('faces') is not None):
            for b in doc['faces']:
                result.append(BBox.fromJson(b))
        return result

    # checks similarity of two faces
    # array of tuples:
    #   [(is_matched, confidence, bbox1, bbox2)
    def verify(self, photo1, photo2, mf_selector = 'biggest', threshold = None):
        doc = self.do_post('/v0/verify', photo1 = photo1, photo2 = photo2, mf_selector = mf_selector, threshold = threshold)
        results = []
        if doc.get('results') is not None:
            for r in doc['results']:
                results.append((r['verified'], r['confidence'], BBox.fromJson(r['bbox1']), BBox.fromJson(r['bbox2'])))
        return results

    # returns array of tuples
    # [(bbox_on_photo, [(confidence_1, Face_1, ..., (confidence_n, Face_n)]
    #  .....
    # ]
    def identify(self, photo_url, n = 1, mf_selector = 'biggest', threshold = None):
        doc = self.do_post('/v0/identify', n = int(n), photo = photo_url, mf_selector = mf_selector, threshold = threshold)
        results = []
        for k, v in doc['results'].items():
            box = (BBox.fromString(k), [])
            for e in v:
                box[1].append((e['confidence'], Face.fromJson(e['face'])))
            results.append(box)
        return results

photo1 = open('/home/mdiener/Downloads/training-originals/0002_1.jpg', 'rb')
photo2 = 'http://static.findface.pro/sample2.jpg'
# if you want to upload files from local machine you could pass file objects or byte strings instead of URL strings:
# like this:
# photo1 = open('/path/to/sample.jpg', 'rb')
# or
# photo1 = open('/path/to/sample.jpg', 'rb').read()

a = FacenAPI('http://35.187.51.87:8000', 'uztOvtq3S2XkbIVi_L9O4UNUz03uyLJm')
r = a.detect(photo1)
print(r)



# r = a.verify(photo1, photo2, threshold = 0.4)
# print(r)
#
# r = a.identify(photo1)
# print(r)
