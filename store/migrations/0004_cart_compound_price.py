# Generated by Django 3.1.5 on 2021-01-29 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_cart_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='compound_price',
            field=models.FloatField(default=0),
        ),
    ]
