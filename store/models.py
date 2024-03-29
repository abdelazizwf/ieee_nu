from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.dispatch import Signal


order_verified = Signal()
cart_removed = Signal()
order_canceled = Signal()


def get_sentinel_user():
    """
    Called to mark the verifier of a history as deleted instead
    of deleting the history object
    """
    return get_user_model().objects.get_or_create(email='deleted@dummyMail.app')[0]


class Category(models.Model):
    """
    A model to create categories for products.
    """
    name = models.CharField(max_length=64, unique=True)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    A model to store products.
    """
    name = models.CharField(max_length=256)
    description = models.TextField()
    price = models.FloatField()
    image = models.ImageField(blank=True, null=True)
    categories = models.ManyToManyField('Category', related_name='products')
    created = models.DateTimeField(auto_now_add=True)
    delivery_duration = models.DurationField()

    def __str__(self):
        return f"{self.name}"


class Cart(models.Model):
    """
    A model to store carts. Carts are objects subset-ed from products and used
    to store the products for the user, until he/she formally places the order.
    """
    product = models.ForeignKey('Product', on_delete=models.PROTECT)
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    count = models.IntegerField()
    added = models.DateTimeField(auto_now_add=True)
    compound_price = models.FloatField(blank=True)  # product.price * count
    previous_count = models.IntegerField(default=0)
    order = models.ForeignKey(
        'Order', on_delete=models.CASCADE, related_name='carts',
        blank=True, null=True)

    def __str__(self):
        return f"CartObject({self.customer.__str__()}: {self.product.name})"

    def send_cart_removed(self):
        cart_removed.send(sender=self.__class__, instance=self)

    def send_order_verified(self):
        order_verified.send(sender=self.__class__, instance=self)

    def send_order_canceled(self):
        order_canceled.send(sender=self.__class__, instance=self)


class Order(models.Model):
    """
    A model to store orders.
    """
    full_price = models.FloatField()
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='orders')
    placed = models.DateTimeField(auto_now_add=True)
    delivery_time = models.DateTimeField(blank=True, null=True)

    @property
    def expiry_date(self):
        return self.delivery_time + timedelta(days=7)

    def __str__(self):
        return f"Order({self.customer}: {self.full_price})"


class History(models.Model):
    """
    A model to store order histories.
    """
    products = models.JSONField()
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), related_name='history')
    full_price = models.FloatField()
    verified_on = models.DateTimeField(auto_now_add=True)
    verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), related_name='verifications')

    class Meta:
        verbose_name_plural = 'Histories'


class Sales(models.Model):
    """
    A model to store the sales data of the products.
    """
    product = models.OneToOneField(
        'Product', on_delete=models.SET_NULL, related_name='sales', null=True)
    product_name = models.CharField(max_length=256, blank=True)
    product_price = models.FloatField(default=0)
    total_count = models.IntegerField(default=0)
    stocked = models.IntegerField(default=0)
    on_hold = models.IntegerField(default=0)
    ordered = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Sales'

    def __str__(self):
        return f"Sales(for: {self.product_name})"
