# Generated by Django 4.1.3 on 2022-12-02 00:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0002_customuser_candidate_customuser_company_admin_and_more"),
    ]

    operations = [
        migrations.RemoveField(model_name="customuser", name="candidate",),
        migrations.RemoveField(model_name="customuser", name="company_admin",),
    ]