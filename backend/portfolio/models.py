from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    github_link = models.URLField()

    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    proficiency = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name
