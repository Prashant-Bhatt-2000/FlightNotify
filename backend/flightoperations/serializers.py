from rest_framework import serializers
from .models import AdminFlightOperations
from accounts.models import User
from .flightConfirmationemail import send_flight_confirmation_email
import uuid

class AdminFlightOperationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminFlightOperations
        fields = '__all__'
        read_only_fields = ('flight_number', 'user')  

        def validate(self, data): 
            user = data.get('user')


            if not user.is_admin: 
                raise serializers.ValidationError('You are not authorize to access this route')
            
            if not user.is_verified: 
                raise serializers.ValidationError('You are not verified. Please verify your account.')
            
            return data
        


from .models import FlightBooking

class FlightBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightBooking
        fields = ['flight_number', 'departure_city', 'arrival_city', 'departure_date', 'arrival_date']

    def validate(self, data):
        flight_number = data.get('flight_number')
        
        if flight_number is not None:
            try:
                flight = AdminFlightOperations.objects.get(flight_number=flight_number)
            except AdminFlightOperations.DoesNotExist:
                raise serializers.ValidationError({"flight_number": "Flight with this number does not exist."})
        else:
            raise serializers.ValidationError({"flight_number": "Flight number is required."})

        # Safeguard against missing context
        request = self.context.get('request')
        if request is None:
            raise serializers.ValidationError({"request": "Request context is missing."})

        user = request.user
        if not user.is_authenticated:
            raise serializers.ValidationError({"user": "User is not authenticated."})

        booking_reference = str(uuid.uuid4())[:8]
        data['booking_reference'] = booking_reference

        flight_details = {
            'flight_number': flight.flight_number,
            'departure_city': flight.origin,
            'arrival_city': flight.destination,
            'departure_date': flight.departure_time,
            'arrival_date': flight.arrival_time,
            'passenger_name': user.username,
        }

        send_flight_confirmation_email(user.email, booking_reference, flight_details)
        
        return data
