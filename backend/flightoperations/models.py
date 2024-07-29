from django.db import models
from uuid import uuid4
from accounts.models import User
import random
import string

# Define choices for the flight status
FLIGHT_STATUS_CHOICES = [
    ('ontime', 'Ontime'),
    ('delayed', 'Delayed'),
    ('cancelled', 'Cancelled'),
]

class AdminFlightOperations(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    flight_number = models.CharField(max_length=20, unique=True, editable=False)
    origin = models.CharField(max_length=50)
    destination = models.CharField(max_length=50)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=FLIGHT_STATUS_CHOICES, default='ontime')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='flight_operations')

    def __str__(self):
        return f"{self.flight_number} - {self.origin} to {self.destination}"

    class Meta:
        verbose_name = 'Flight Operation'
        verbose_name_plural = 'Flight Operations'
        ordering = ['departure_time']

    def generate_flight_number(self):
        """Generate a unique flight number."""
        characters = string.ascii_uppercase + string.digits
        return ''.join(random.choices(characters, k=6))

    def save(self, *args, **kwargs):
        if not self.flight_number:
            self.flight_number = self.generate_flight_number()
        super().save(*args, **kwargs)



class FlightBooking(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='book_flight')
    booking_reference = models.CharField(max_length=20, unique=True)
    flight_number = models.CharField(max_length=10)
    departure_city = models.CharField(max_length=100)
    arrival_city = models.CharField(max_length=100)
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()
    seat_number = models.CharField(max_length=10, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.passenger_name} - {self.booking_reference}"

