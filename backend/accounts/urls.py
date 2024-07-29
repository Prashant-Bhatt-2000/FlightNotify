from django.urls import path
from .views import AdminRegister, AdminLogin, CustomerRegister, CustomerLogin, VerifyEmail, CustomerLogoutView

urlpatterns = [
    path('adminsignup', AdminRegister.as_view(), name='create_admin'), 
    path('adminsignin', AdminLogin.as_view(), name='admin_signin'), 
    path('customersignup', CustomerRegister.as_view(), name='create_customer'), 
    path('customersignin', CustomerLogin.as_view(), name='customer_signin'), 
    path('customersignout', CustomerLogoutView.as_view(), name='customer_signout'), 
    path("verifytoken/<str:token>", VerifyEmail.as_view(), name='verify_email'),
]