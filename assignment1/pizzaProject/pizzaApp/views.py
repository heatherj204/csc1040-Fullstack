from django.shortcuts import render, redirect
from . forms import *
from .models import *

# Authentication models and functions
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.shortcuts import render, redirect

# Create you views here.
def index(request):
    if ( request.user.is_authenticated):
        messages.success(request, "You are already logged in!")
        return redirect("dashboard")

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
    form = LoginForm()
    if request.method == "POST":
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)

            if user is not None:
                auth.login(request, user)
                messages.success(request, "Logged in successfuly!")
                return redirect("dashboard")

    context = {'loginform':form}
    return render(request, 'my_login.html', context=context)

def user_logout(request):
    auth.logout(request)
    messages.success(request, "Logged out successfuly!")
    return redirect('homepage')

def dashboard(request):
    if (not request.user.is_authenticated):
        messages.warning(request, "You are not logged in!")
        return redirect("my-login")
    #person = request.user
    orders = OrderDetails.objects.filter(person_id=request.user.id)
    #orders = OrderDetails.objects.filter(User)

    context = {'orders': orders}
    return render(request, 'dashboard.html', context=context)


def order(request):
    if (not request.user.is_authenticated):
        messages.warning(request, "You are not logged in!")
        return redirect("my-login")

    if request.method == "POST":
        form = PizzaOrderForm(request.POST)

        if form.is_valid():
            request.session['order_data'] = {
                'person': request.user,
                'size': form.cleaned_data['size'].id,
                'base': form.cleaned_data['base'].id,
                'sauce': form.cleaned_data['sauce'].id,
                'cheese': form.cleaned_data['cheese'].id,
                'toppings': [t.id for t in form.cleaned_data['toppings']]
            }
            request.session.modified = True

            messages.success(request, "Pizza order saved! Now enter payment details.")
            return redirect("payment")
    else:
        form = PizzaOrderForm()
    context = {'orderform':form}
    return render(request, 'order.html', context=context)

def payment(request):
    if (not request.user.is_authenticated):
        messages.warning(request, "You are not logged in!")
        return redirect("my-login")

    if request.method == "POST":
        payment_form = PaymentForm(request.POST)
        if payment_form.is_valid():
            order = Order.objects.create()

            order_details = OrderDetails.objects.create(
                order = order,
                person = request.user,
                size_id=request.session['order_data']['size'],
                base_id=request.session['order_data']['base'],
                sauce_id=request.session['order_data']['sauce'],
                cheese_id=request.session['order_data']['cheese'],
            )
            order_details.toppings.set(request.session['order_data']['toppings'])
            payment = payment_form.save(commit=False)
            payment.order = order
            payment.save()

            # clear session data
            del request.session['order_data'] # <-- move this to the conformation page sections otherwise there will be issues (need to pass the session data in order to dispay it for the next page)

            messages.success(request, "Order placed successfully!")
            return redirect("dashboard")
    else:
        payment_form = PaymentForm()
    context = {'paymentform':payment_form}
    return render(request, 'payment.html', context=context)

def confirmation(request):
    if (not request.user.is_authenticated):
        messages.warning(request, "You are not logged in!")
        return redirect("my-login")
