from django.db import models
from django.contrib.auth.models import User
from django.db import models
#import datetime as dt

# Pizza Size
class Size(models.Model):
    name = models.CharField(max_length=50, unique=True, default='---')

    def __str__(self):
        return self.name

# Pizza Base
class Base(models.Model):
    name = models.CharField(max_length=50, unique=True, default='---')

    def __str__(self):
        return self.name

# Sauce Choice
class Sauce(models.Model):
    name = models.CharField(max_length=50, unique=True, default='---')

    def __str__(self):
        return self.name

# Cheese Choice
class Cheese(models.Model):
    name = models.CharField(max_length=50, unique=True, default='---')

    def __str__(self):
        return self.name

# Toppings (Allow multiple choices)
class Topping(models.Model):
    name = models.CharField(max_length=50, unique=True, default='---')

    def __str__(self):
        return self.name

class OrderDetails(models.Model):
    person = models.ForeignKey(User, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    sauce = models.ForeignKey(Sauce, on_delete=models.CASCADE)
    cheese = models.ForeignKey(Cheese, on_delete=models.CASCADE)
    toppings = models.ManyToManyField(Topping)
    time_ordered = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"OrderDetails for Order {self.order.id}"

# Payment Information
class Payment(models.Model):
    order = models.OneToOneField(OrderDetails, on_delete=models.CASCADE, related_name='payment')
    name = models.CharField(max_length=200)
    address1 = models.CharField(max_length=200)
    address2 = models.CharField(max_length=200)
    address3 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200)
    county = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    card_name = models.CharField(max_length=200)
    card_number = models.CharField(max_length=16)
    cvv = models.CharField(max_length=4)
    expire = models.CharField(max_length=7)

    def __str__(self):
        return f"Payment for order {self.order.id}"
