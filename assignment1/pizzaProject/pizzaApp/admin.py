from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Size)
admin.site.register(Base)
admin.site.register(Sauce)
admin.site.register(Cheese)
admin.site.register(Topping)
admin.site.register(OrderDetails)
admin.site.register(Payment)