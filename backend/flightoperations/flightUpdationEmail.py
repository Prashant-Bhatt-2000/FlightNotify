from django.core.mail import send_mail
from django.conf import settings

def send_flight_update_email(email, booking_reference, flight_details):
    subject = "Your Flight Booking Details Have Been Updated"
    message = f"""
    <html>
    <body>
        <h1 style="color: #333;">Flight Booking Update</h1>
        <p style="color: #666;">
            We wanted to inform you that the details of your flight booking have been updated. Below are the updated details of your booking:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Booking Reference</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{booking_reference}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Flight Number</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{flight_details['flight_number']}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Departure City</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{flight_details['departure_city']}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Arrival City</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{flight_details['arrival_city']}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Departure Date</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{flight_details['departure_date']}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Arrival Date</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{flight_details['arrival_date']}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Passenger Name</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{flight_details['passenger_name']}</td>
            </tr>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Status</th>
                <td style="border: 1px solid #ddd; padding: 8px;">{flight_details['status']}</td>
            </tr>
        </table>
        <p style="color: #666; margin-top: 20px;">
            If you have any questions or need further assistance, please do not hesitate to contact our support team.
        </p>
        <p style="color: #666;">
            Thank you for choosing us for your travel needs!
        </p>
    </body>
    </html>
    """
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, [email], html_message=message)
