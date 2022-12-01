#take django objects to JSON
from rest_framework import serializers
from .models import Employer
from .models import Job
from .models import Candidate

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("__all__")
        model = Employer

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("__all__")
        model = Job

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("__all__")
        model = Candidate