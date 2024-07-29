from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from django.shortcuts import redirect
from .serializer import AdminSerializer, AdminLoginSerializer, CustomerSerializer, CustomerLoginSerializer
from .models import User
from django.conf import settings


class AdminRegister(APIView):
    def post(self, request):
        data = request.data
        serializer = AdminSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            response = {'message': 'Registered success. Please Verify your email Before Login.', 'data': serializer.validated_data}
            return Response(response, status=status.HTTP_201_CREATED)
        return Response({'message': 'error', 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(APIView):
    def get(self, request, token):
        try:
            user = User.objects.get(verification_token=token)

            if not user.is_verified:
                user.is_verified = True
                user.save()

                if user.is_admin: 
                    return redirect(settings.ADMIN_LOGIN_URL)
                elif user.is_customer : 
                    return redirect(settings.CUSTOMER_LOGIN_URL)
            else:
                return Response({'message': 'Email already verified'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)



class AdminLogin(APIView): 
    def post(self, request): 
        data = request.data
        print(data)
        serializer = AdminLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True): 
            response = {'message': 'Login success', 'data': serializer.validated_data}
            return Response(response, status=status.HTTP_200_OK)
        return Response({'error': 'error', 'data': serializer.error_messages}, status=status.HTTP_401_UNAUTHORIZED)




class CustomerRegister(APIView): 
    def post(self, request): 
        data = request.data
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid(raise_exception=True): 
            serializer.save()  
            response = {'message': 'registered success', 'data': serializer.validated_data}
            return Response(response, status=status.HTTP_201_CREATED )
        return Response({'message': 'error', 'data': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class CustomerLogin(APIView): 
    def post(self, request): 
        data = request.data
        print(data)
        serializer = CustomerLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True): 
            print(serializer.validated_data)
            return Response({'message': 'Login success', 'data': serializer.validated_data})
        return Response({'message': 'error', 'data': serializer.error_messages})
    


class CustomerLogoutView(APIView): 
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')

            if not refresh_token:
                return Response({'detail': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            
            token.blacklist()

            return Response({'message': 'Logout successful.'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

