from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    company_admin = models.BooleanField(default=False)
    recruiter = models.BooleanField(default=False)
    candidate = models.BooleanField(default=False)

    def __str__(self):
        return self.username