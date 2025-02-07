from django.db import models

# Create your models here.

class Author(models.Model):
    id = models.IntegerField(primary_key=True)
    date_created = models.DateTimeField(auto_now=True)
    date_modified = models.DateTimeField(auto_now_add=True)
    name = models.TextField()
    bio = models.TextField()


class Book(models.Model):
#     def __init__(self, title, author, year, isbn):
#         self.title = title
#         self.author = author
#         self.year = year
#         self.isbn = isbn
    # id = models.IntegerField(primary_key=True)
    title = models.TextField() # Any length text field
    # author = models.CharField(max_length=10) #Trxt fiel with a max length of 10
    author = models.ForeignKey(Author, on_delete=models.CASCADE) # on_delete=models.CASCADE -> if the author gets deleted then delete all books by them
    year = models.IntegerField()
    isbn = models.CharField(max_length=10)
    genre = models.TextField(default="SciFi")
    page_conut = models.IntegerField(null=True)

# a = Book('Lord of the rings', 'JRR T.', 1930, 'abcdef')
# a.title