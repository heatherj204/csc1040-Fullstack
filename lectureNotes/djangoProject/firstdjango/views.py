from django.http import HttpResponse
from django.shortcuts import render
from . import models

# Create your views here.
def index(request):
    return render(request, 'index.html')

def contacts(request):
    return render(request, 'contacts.html')

def profile(request, name, age):
    area = request.GET.get('area', 'Dublin') # get the value for the key area and if it doesnt exist the key area is dublin
    return render(request, 'profile.html', {'name': name, 'age': age, 'area': area})

def all_books(request):
    books = models.Book.objects.all() # select * from book
    return render(request, 'books.html', {'books': books})