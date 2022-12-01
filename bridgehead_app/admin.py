from django.contrib import admin

# Register your models here.
from .models import Employer
from .models import Job
from .models import Candidate

admin.site.register(Employer)
admin.site.register(Job)
admin.site.register(Candidate)
