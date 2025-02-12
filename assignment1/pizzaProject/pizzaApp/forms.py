from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django import forms
from django.forms.widgets import *
from .models import *

# User register
class CreateUserForm(UserCreationForm):

    class Meta:

        model = User
        fields = ['username', 'email', 'password1', 'password2']

# Authenticate user
class LoginForm(AuthenticationForm):

    username = forms.CharField(widget=TextInput())
    password = forms.CharField(widget=PasswordInput())

class PizzaOrderForm(forms.ModelForm):
    size = forms.ModelChoiceField(queryset=Size.objects.all(), empty_label="Select Size")
    base = forms.ModelChoiceField(queryset=Base.objects.all(), empty_label="Select Base")
    sauce = forms.ModelChoiceField(queryset=Sauce.objects.all(), empty_label="Select Sauce")
    cheese = forms.ModelChoiceField(queryset=Cheese.objects.all(), empty_label="Select Cheese")
    toppings = forms.ModelMultipleChoiceField(
        queryset=Topping.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False  # Allows submitting the form without selecting toppings
    )
    class Meta:
        model = OrderDetails
        fields = ['size', 'base', 'sauce', 'cheese', 'toppings']

class PaymentForm(forms.ModelForm):

    class Meta:
        model = Payment
        fields = ['name', 'address1', 'address2', 'address3', 'city', 'county', 'country', 'card_name', 'card_number', 'cvv', 'expire']