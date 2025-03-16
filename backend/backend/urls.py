from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework.routers import DefaultRouter
from portfolio.views import ProjectViewSet, SkillViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'skills', SkillViewSet)

def home_view(request):
    return HttpResponse("<h1>Welcome to My Django API</h1>")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', home_view),  # This makes http://127.0.0.1:8000/ show a welcome message.
]
