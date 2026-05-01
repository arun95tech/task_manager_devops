from django.urls import path
from .views import health_check, task_list_create, task_detail

urlpatterns = [
    path("health/", health_check, name="task-health"),
    path("tasks/", task_list_create, name="task-list-create"),
    path("tasks/<int:task_id>/", task_detail, name="task-detail"),
]