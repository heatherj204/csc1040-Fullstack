# Manage urls for myfirstapp here
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="homepage"), # "/" , e.g. facebook.com
    path('contact', views.about, name="aboutme"),#website.com/about
    path('profile/<str:name>/<int:age>', views.profile, name='profile'),
    path('books', views.all_books, name='books'),
    path('books/<int:id>', views.single_book, name='single_book'),
    path('books/genre/<str:genre>', views.books_by_genre, name="by_genre"),
    path('author/<int:id>', views.books_by_author, name="by_author"),
    path('upload', views.upload_book, name='new_book'),
    path('edit/<int:id>', views.update_book, name="update")
]
