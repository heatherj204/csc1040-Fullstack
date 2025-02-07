from django.shortcuts import render, get_object_or_404, redirect
from . import models # models.Author, models.Book
from . import forms
#from models import * # Autho, Book



# Create your views here.

def index(request):
    x = range(0,10)
    name = 'Michael'
    return render(request, 'index.html', {'x':x, 'myname':name})

def about(request):
    return render(request, 'about.html')

def profile(request, name, age):
    area = request.GET.get('area', 'Dublin')# get the value for the key area, if no key exists, use Dublin as default
    return render(request, 'profile.html', {'name':name, 'age':age, 'area':area})


def all_books(request):
    books = models.Book.objects.all()# SELECT * FROM BOOK
    return render(request,'books.html', {'books':books})


def single_book(request, id):
    #book = models.Book.objects.get(id=id)
    book = get_object_or_404(models.Book, pk=id)
    # if book is None
    # return 404 page
    # else
    # return product page
    return render(request, 'book_individual.html', {'book':book})

def books_by_genre(request, genre):
    # SELECT * from Books where 
    genre_cleaned = genre.lower()
    books = models.Book.objects.filter(genre=genre_cleaned)
    return render(request,'books.html', {'books':books})


def books_by_author(request, id):
    author = get_object_or_404(models.Author, pk=id)
    books = models.Book.objects.filter(author=author)
    return render(request, 'author.html', {'author':author, 'books':books})



def upload_book(request):
      # if user us performing GET reuqest, show the form
      # if user is performing post request, 
      # the user has submitted the form and we need to save the data
      
    if request.method == "POST":
        form = forms.BookForm(request.POST) # Create a book with the data sent in the POST request
        if form.is_valid():
            book = form.save() # Create a new book object and save it in the database
            return render(request, 'book_individual.html', {'book':book}) # bounce user to the single book page
    else:
        # Just show the form
        form = forms.BookForm()
    return render(request, 'upload_book.html', {'form':form})


def update_book(request, id):
    book = get_object_or_404(models.Book,id=id)
    if request.method == "POST":
        form = forms.BookForm(request.POST, instance=book)
        if form.is_valid():
            form.save()
            return render(request, 'book_individual.html', {'book':book})
    else:
        form = forms.BookForm(instance=book)
    return render(request, 'upload_book.html', {'form':form})
