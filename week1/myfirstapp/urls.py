# Manage urls from my firstapp here
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="homepage") # if the user is going to the "root" of the webpage then this function will call the index file
]