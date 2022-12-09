from django.urls import path
from rest_framework import routers
from .views import JobViewSet, UserViewSet, CurrentUserViewSet, JobApplyViewSet, RecruiterCandidateViewSet, RecruiterJobViewSet

app_name = "bridgehead_api"

router = routers.DefaultRouter()
router.register('jobs', JobViewSet, basename="job-view-set")
router.register('users', UserViewSet, basename="users-view-set")
router.register('current-user', CurrentUserViewSet, basename="current-user-view-set")
router.register('job-apply', JobApplyViewSet, basename="job-apply-view-set")
router.register('recruiter-candidate', RecruiterCandidateViewSet, basename="recruiter-candidate-view-set" )
router.register('recruiter-job', RecruiterJobViewSet, basename="recruiter-job-view-set")
# router.register('search', SearchJobViewSet, basename="search-job-view-set")

urlpatterns = router.urls

# urlpatterns = [
#     path("", ListJob.as_view())
# ]