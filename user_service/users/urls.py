from django.urls import path
from .views import health_check, register_user, login_user

urlpatterns = [
    path("health/", health_check, name="user-health"),
    path("register/", register_user, name="register-user"),
    path("login/", login_user, name="login-user"),
]