from django.shortcuts import render, redirect
from django.http import HttpResponse
from . forms import CreateUserForm

# Create your views here.
def index(request):
    return render(request, 'index.html')

def register(request):

    form = CreateUserForm()
    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()

            return redirect("my-login")

    context = {'registerform':form}
    return render(request, 'register.html', context=context)

def my_login(request):
    return render(request, 'my_login.html')

def dashboard(request):
    return render(request, 'dashboard.html')