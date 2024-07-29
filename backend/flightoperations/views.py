from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import AdminFlightOperationsSerializer, FlightBookingSerializer
from .models import AdminFlightOperations, FlightBooking
from .flightUpdationEmail import send_flight_update_email

class CreateFlight(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = AdminFlightOperationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetFlights(APIView): 
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request): 
        flights = AdminFlightOperations.objects.all()
        serializer = AdminFlightOperationsSerializer(flights, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class UpdateFlight(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def put(self, request, flight_id):
        try:
            flight = AdminFlightOperations.objects.get(id=flight_id)
        except AdminFlightOperations.DoesNotExist:
            return Response({'error': 'Flight not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AdminFlightOperationsSerializer(flight, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # Retrieve the updated flight to ensure all fields are up-to-date
            updated_flight = AdminFlightOperations.objects.get(id=flight_id)

            bookings = FlightBooking.objects.filter(flight_number=updated_flight.flight_number)
            for booking in bookings:
                flight_details = {
                    'flight_number': updated_flight.flight_number,
                    'departure_city': updated_flight.origin,
                    'arrival_city': updated_flight.destination,
                    'departure_date': updated_flight.departure_time,
                    'arrival_date': updated_flight.arrival_time,
                    'passenger_name': booking.user.username,
                    'status': updated_flight.status  # Ensure status is included here
                }
                send_flight_update_email(booking.user.email, booking.booking_reference, flight_details)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class BookFlightAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FlightBookingSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class MyBookingsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        bookings = FlightBooking.objects.filter(user=user)
        
        serializer = FlightBookingSerializer(bookings, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)