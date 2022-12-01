from django.urls import path
from rest_framework import routers
from .views import JobViewSet

router = routers.DefaultRouter()
router.register('', JobViewSet)

urlpatterns = router.urls

# urlpatterns = [
#     path("", ListJob.as_view())
# ]
