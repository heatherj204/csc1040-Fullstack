# Generated by Django 5.1.5 on 2025-02-11 10:25

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pizzaApp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='base',
            name='base',
        ),
        migrations.RemoveField(
            model_name='base',
            name='order_det',
        ),
        migrations.RemoveField(
            model_name='cheese',
            name='cheese',
        ),
        migrations.RemoveField(
            model_name='cheese',
            name='order_det',
        ),
        migrations.RemoveField(
            model_name='order',
            name='date_ordered',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='order_det',
        ),
        migrations.RemoveField(
            model_name='sauce',
            name='order_det',
        ),
        migrations.RemoveField(
            model_name='sauce',
            name='sauce',
        ),
        migrations.RemoveField(
            model_name='size',
            name='order_det',
        ),
        migrations.RemoveField(
            model_name='size',
            name='size',
        ),
        migrations.RemoveField(
            model_name='topping',
            name='order_det',
        ),
        migrations.RemoveField(
            model_name='topping',
            name='topping',
        ),
        migrations.AddField(
            model_name='base',
            name='name',
            field=models.CharField(default='---', max_length=50, unique=True),
        ),
        migrations.AddField(
            model_name='cheese',
            name='name',
            field=models.CharField(default='---', max_length=50, unique=True),
        ),
        migrations.AddField(
            model_name='order',
            name='time_ordered',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='payment',
            name='order',
            field=models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to='pizzaApp.order'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sauce',
            name='name',
            field=models.CharField(default='---', max_length=50, unique=True),
        ),
        migrations.AddField(
            model_name='size',
            name='name',
            field=models.CharField(default='---', max_length=50, unique=True),
        ),
        migrations.AddField(
            model_name='topping',
            name='name',
            field=models.CharField(default='---', max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.CreateModel(
            name='OrderDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('base', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizzaApp.base')),
                ('cheese', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizzaApp.cheese')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizzaApp.order')),
                ('sauce', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizzaApp.sauce')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pizzaApp.size')),
                ('toppings', models.ManyToManyField(to='pizzaApp.topping')),
            ],
        ),
    ]
