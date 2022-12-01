from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
import uuid

# Create your models here.

class Employer(models.Model):
    company_name = models.CharField(max_length=50)
    company_address = models.CharField(max_length=150)
    company_phone = PhoneNumberField(blank=True)
    company_email = models.EmailField(max_length=100)
    company_poc = models.CharField(max_length=50)
    company_acknowledge = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name

class Job(models.Model):
    job_title = models.CharField(max_length=50)
    JOB_TYPE_CHOICES = [
        ('AA', 'Please pick one'),
        ('HE', 'Health'),
        ('OP', 'Operations'),
        ('MA', 'Marketing'),
        ('SA', 'Sales'),
        ('TE', 'Tech'),
    ]
    job_type = models.CharField(
        max_length=2,
        choices=JOB_TYPE_CHOICES,
    )
    job_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    job_description = models.TextField(max_length=2500)
    created_at = models.DateTimeField(auto_now_add=True)
    candidate_applied = models.BooleanField(default=False)

    def __str__(self):
        return str(self.job_id)[0:6] + ", " + self.job_title

class Candidate(models.Model):
    candidate_last_name = models.CharField(max_length=50)
    candidate_first_name = models.CharField(max_length=50)
    candidate_address = models.CharField(max_length=150)
    candidate_phone = PhoneNumberField(blank=True)
    candidate_email = models.EmailField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.candidate_last_name + ", " + self.candidate_first_name