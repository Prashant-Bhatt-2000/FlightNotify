## FlightBooking App

### Tech Stack: 

    1. Backend: Django 
    2. Frontend : React Js
    3. Data Base : Postgres


### Authentication : Multi user (Admin , Customer)

### Project Setup 

    1. Git Clone : git clone https://github.com/Prashant-Bhatt-2000/FlightNotify.git

    2. Download requirement.txt: 

    3. Run react command: npm install


---

### Full Deployed Version of Back-end (Including Postgres) + Dockerize
Git repo : https://github.com/Prashant-Bhatt-2000/FlightNotify_Backend

### Dockerize Frontend
git : https://github.com/Prashant-Bhatt-2000/FlightBook_frontend

### Requirement 

#### Before starting Please setup your Email

    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = 'Put your own email'
    EMAIL_HOST_PASSWORD = 'Put your own app generated password of google'

#### PostGres Setup according to this Configuration:

    DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'FlightNotify',
        'USER': 'postgres',  
        'PASSWORD': 'postgres',  
        'HOST': 'localhost',
        'PORT': '5432', 
    }
}


### API's

    Authentication APIs : 

    Admin Signup : 

        API : http://localhost:8000/api/accounts/adminsignup

            data :{ 
                "username": "Prashant", 
                "email": "bhatt.prashant2018@gmail.com", 
                "password": "Password"
            }
    
    Note : You can't sign in without verifying email.

    Admin Signin : 

        API : http://localhost:8000/api/accounts/adminsignin

            data :{ 
                "email": "bhatt.prashant2018@gmail.com", 
                "password": "Password"
            }

    
    Customer Signup : 

        API : http://localhost:8000/api/accounts/customersignup

            data :{ 
                "username": "Prashant", 
                "email": "bhatt.prashant2000@gmail.com", 
                "password": "Password"
            }
    
        Note : You can't sign in without verifying email.
    
    Customer Signin : 

        API : http://localhost:8000/api/accounts/customersignin

            data :{ 
                "email": "bhatt.prashant2018@gmail.com", 
                "password": "Password"
            }


<!-- TOKEN NEEDED FOR SIGNOUT -->
 <!-- Bearer <TOKEN> -->
    Customer SIgnout: 

        API: http://localhost:8000/api/accounts/customersignout
---



### FlightOperations

    <!-- TOKEN NEEDED for all Flight Operations -->
    <!-- Bearer <TOKEN> -->

    ADMIN ONLY ROUTE : 

    Create Flight : 
             
        API : http://localhost:8000/api/flight/createflight

        Data : { 
            origin: newFlight.origin,
            destination: newFlight.destination,
            departure_time: newFlight.departure_time,
            arrival_time: newFlight.arrival_time,
            status: newFlight.status
        }


    UpdateFlight: 

    API : http://localhost:8000/api/flight/updateflight/<str:flight_id>

    Data : { 
            origin: origin,
            destination: destination,
            departure_time: departure_time,
            arrival_time: arrival_time,
            status: status
        }

        Onevery change the Customers who booked that flight will get an email


    
    Customer: 

    Bookflight : 
    API : http://localhost:8000/api/flight/bookflight

    Data : { 
        flight_number: flight_number,
        seats: seats,
        departure_city: origin,
        arrival_city: destination,
        departure_date: departure_time,
        arrival_date: arrival_time,
    }


    Get Flights : 

    API : http://localhost:8000/api/flight/getflights



    MyBookings : 

    API : http://localhost:8000/api/flight/mybookings

----

### Frontend Routes

### ADMIN ROUTES

    1. /admin (admin auth needed)
    2. /admin/login

    (Note : Admin Signup can only be done by backend api through Postman or thunderclient)

### Customer Routes (only for customers)

    1. /signin
    2. /signup
    3. /flights (auth needed)
    4. /bookings (auth needed)

### Public Routes (open to anyone- No auth needed)

    1. /
    2. /contactus

# THANK YOU


---
