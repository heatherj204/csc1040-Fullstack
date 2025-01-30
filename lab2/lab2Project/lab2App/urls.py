from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('contact', views.contact, name="contacts"),
    path('variable',views.variable, name="variable"),
    path('loopexample', views.loopexample, name="loopexample")
]