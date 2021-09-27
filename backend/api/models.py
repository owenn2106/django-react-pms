from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Client(models.Model):
    name = models.CharField(max_length=128, null=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=50, null=True)
    # auto_now is for future dates (e.g. modify date)
    date_created = models.DateField(auto_now_add=True)

    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Project(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done')
    )

    name = models.CharField(max_length=128)
    deadline = models.DateField()
    date_created = models.DateField(auto_now_add=True)
    description = models.TextField(max_length=128, null=True, blank=True)
    status = models.CharField(max_length=20, null=True, choices=STATUS)

    client = models.ForeignKey(
        Client, null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name) + " - " + str(self.client)


class Todolist(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Done', 'Done')
    )

    task = models.CharField(max_length=128, null=True)
    date_created = models.DateField(auto_now_add=True)
    target_time = models.DateField()
    status = models.CharField(max_length=20, null=True, choices=STATUS)

    project = models.ForeignKey(Project, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.task) + " - " + str(self.project)
