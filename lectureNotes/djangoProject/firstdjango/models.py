from django.db import models

# Create your models here.
class Book(models.Model):
#     def __init__(self, title, author, year, isbn):
#         self.title = title
#         self.author = author
#         self.year = year
#         self.isbn = isbn
    title = models.TextField() # Any length text field
    author = models.CharField(max_length=10) #Trxt fiel with a max length of 10
    year = models.IntegerField()
    isbn = models.CharField(max_length=10)

# a = Book('Lord of the rings', 'JRR T.', 1930, 'abcdef')
# a.title