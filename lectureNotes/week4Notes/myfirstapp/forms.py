from django import forms
from .models import *



class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title','author','year','isbn','genre','num_pages']