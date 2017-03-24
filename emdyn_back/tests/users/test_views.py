from django.test import RequestFactory

from test_plus.test import TestCase


class BaseUserTestCase(TestCase):

    def setUp(self):
        self.user = self.make_user()
        self.factory = RequestFactory()


