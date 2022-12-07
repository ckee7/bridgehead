from rest_framework import generics, viewsets
from .models import Job
from .serializers import JobSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsRecruiter, IsCandidate
from rest_framework.decorators import action
from rest_framework.response import Response

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    @action(detail=False)
    def search(self, request):
        keyword = request.query_params["q"]
        queryset = Job.objects.filter(job_description__contains=keyword)
        return Response(queryset)
        print(request)
        print(request.query_params)
        print(request.query_params["q"])
    # permission_classes = [IsAuthenticated, IsRecruiter, IsCandidate]

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