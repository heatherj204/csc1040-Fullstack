from django.db import models

# Create your models here.
# EVERY TIME YOU MODIFY THIS FILE YOU HAVE TO MIGRATE YOUR DATABASE
# run these two commans 
# python manage.py makemigraions
# python manage.py migrate

class Author(models.Model):
    id = models.IntegerField(primary_key=True)
    date_created = models.DateTimeField(auto_now=True)
    date_modified = models.DateTimeField(auto_now_add=True)
    name = models.TextField()
    bio = models.TextField()


    def __str__(self):
        return self.name

class Book(models.Model):
    # def __init__(self, title, author, year, isbn):
    #     self.title = title
    #     self.author = author
    #     self.year = year
    #     self.isbn = isbn
    title = models.TextField() # any length text field
    author = models.ForeignKey(Author, on_delete=models.CASCADE )  # if I delete an author, delete all books associated with them
    year = models.IntegerField()
    isbn = models.CharField(max_length=10)
    genre = models.TextField(default='Scifi') # Genre, if no genre is supplied use Scifi as a default value
    num_pages = models.IntegerField(null=True) # num_pages, if no value is suplied, allow it to be null (None in python)



