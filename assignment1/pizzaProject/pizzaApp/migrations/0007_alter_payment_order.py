# Generated by Django 5.1.5 on 2025-02-12 21:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pizzaApp', '0006_alter_payment_order_remove_orderdetails_order_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='order',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='payment', to='pizzaApp.orderdetails'),
        ),
    ]
