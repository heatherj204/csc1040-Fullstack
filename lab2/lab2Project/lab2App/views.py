from django.shortcuts import render
from django.http import HttpResponse
import random
# Create your views here.

def index(request):
    return render(request, 'index.html')

def contact(request):
    return render(request, 'contact.html')

def variable(request):
    y = random.randint(0, 100)
    notY = random.randint(0,100)
    x = 5
    return render(request, 'variable.html', {'x':x,'y':y, 'notY':notY,})

def loopexample(request):
	names = ['John','Paul','George','Ringo']
	return render(request, 'loopexample.html', {'names':names})