from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="homepage"),
    path('register', views.register, name="register"),
    path('my-login', views.my_login, name="my-login"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('user-logout', views.user_logout, name="user-logout"),
    path('order', views.order, name="order"),
    path('payment', views.payment, name="payment"),
    path('confirmation', views.confirmation, name="confirmation")
]