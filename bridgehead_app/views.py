from rest_framework import generics, viewsets
from .models import Job
from .serializers import JobSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsRecruiter

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticated, IsRecruiter]

# class ListJob(generics.ListCreateAPIView):
#     job = Job.objects.all()
#     queryset = job
#     serializer_class = JobSerializer

# class DetailJob(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Job.objects.all()
#     serializer_class = JobSerializer