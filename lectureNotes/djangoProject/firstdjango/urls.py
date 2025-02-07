from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('contacts', views.contacts, name="contacts"),
    path('profile/<str:name>/<int:age>', views.profile, name='profile'),
    path('books', views.all_books, name='books')
]