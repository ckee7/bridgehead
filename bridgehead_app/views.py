from rest_framework import generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Job
from .serializers import JobSerializer, UserSerializer, CurrentUserSerializer, JobApplySerializer
from .permissions import IsRecruiter, IsCandidate


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    @action(detail=False)
    def search(self, request):
        keyword = request.query_params["q"]
        queryset = Job.objects.filter(job_description__contains=keyword)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        # return Response(queryset)
        print(request)
        print(request.query_params)
        print(request.query_params["q"])
    # permission_classes = [IsAuthenticated, IsRecruiter, IsCandidate]

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class CurrentUserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CurrentUserSerializer

    def get_queryset(self):
        return self.queryset.filter(id=self.request.user.id)

class JobApplyViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobApplySerializer

#DISREGARD BELOW

# class SearchJobViewSet(viewsets.ModelViewSet):
#     queryset = Job.objects.filter(job_description__contains="robust")
#     serializer_class = JobSerializer
#     @action(detail=False)
#     def search(self, request):
#         print(request)
#         print(request.query_params)
#         print(request.query_params["q"])

# class ListJob(generics.ListCreateAPIView):
#     job = Job.objects.all()
#     queryset = job
#     serializer_class = JobSerializer

# class DetailJob(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Job.objects.all()
#     serializer_class = JobSerializer