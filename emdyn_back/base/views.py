from django.views import generic
from django.core.exceptions import SuspiciousOperation, PermissionDenied


class SecureCheck(object):
    @staticmethod
    def _merge_params(base, *dcts):
        for other_dict in dcts:
            for k, v in other_dict.items():
                if k in base and v != base[k]:
                    raise SuspiciousOperation
                base[k] = v

    def check_request(self, request, *args, **kwargs):
        self._merge_params(kwargs, request.GET, request.POST)
        return self.check_permission(request.user, *args, **kwargs)

    def check_permission(self, user, *args, **kwargs):
        raise NotImplementedError


class SuperUserSecure(SecureCheck):
    def check_permission(self, user, *args, **kwargs):
        return user.is_superuser and user.is_verified()


class SecureView(generic.View):
    permissions = SuperUserSecure()
    permissions_method = all  # or any

    def dispatch(self, request, *args, **kwargs):
        permissions = self.permissions
        if not isinstance(permissions, (list, tuple, set)):
            permissions = (permissions,)
        if self.permissions_method(
            permission.check_request(request, *args, **kwargs)
            for permission in permissions
        ):
            return super(SecureView, self).dispatch(request, *args, **kwargs)
        raise PermissionDenied


class SecureTemplateView(generic.TemplateView, SecureView):
    pass
