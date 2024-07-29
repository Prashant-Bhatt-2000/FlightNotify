from django.urls import path
from .views import CreateFlight, GetFlights, UpdateFlight, BookFlightAPIView, MyBookingsView

urlpatterns = [
    path('createflight', CreateFlight.as_view(), name='create_flight'), 
    path('getflights', GetFlights.as_view(), name='get_flights'), 
    path('updateflight/<str:flight_id>', UpdateFlight.as_view(), name='update_Flight'),
    path('bookflight', BookFlightAPIView.as_view(), name='book_flight'), 
    path('mybookings', MyBookingsView.as_view(), name='mybookings')
]