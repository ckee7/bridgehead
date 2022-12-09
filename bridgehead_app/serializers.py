#take django objects to JSON
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Employer
from .models import Job
from .models import Candidate

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("__all__")
        model = Employer

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        # fields = ("__all__")
        fields = ["id", "created_at"]
        model = Candidate


class RecruiterCandidateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "username", "first_name", "last_name", "email"]
        model = get_user_model()

class RecruiterJobSerializer(serializers.ModelSerializer):
    candidate = RecruiterCandidateSerializer(read_only=True, many=True)
    class Meta:
        fields = ["id", "job_title", "job_type", "candidate"]
        model = Job


class JobSerializer(serializers.ModelSerializer):
    candidates_detail = CandidateSerializer(read_only=True, many=True, source="candidates")
    class Meta:
        fields = ["job_title", "job_type", "job_description", "candidates_detail", "id", "candidate", "recruiter"]
        model = Job

class JobApplySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "candidate", "recruiter"]
        model = Job

class CurrentUserSerializer(serializers.ModelSerializer):
    job_detail = JobSerializer(read_only=True, many=True, source="jobs")
    class Meta:
        fields = ["username", "id", "recruiter", "job_detail"]
        model = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["username", "id", "recruiter"]
        model = get_user_model()
