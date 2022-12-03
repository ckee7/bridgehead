from rest_framework import permissions

class IsRecruiter(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.recruiter

class IsCandidate(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.candidate