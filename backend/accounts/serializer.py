from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .emailverify import sendemail
from uuid import uuid4


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def validate(self, data):
        password = data['password']
        data['password'] = make_password(password)

        email = data.get('email')

        if User.objects.filter(email=email).exists():
            raise ValidationError({'message': 'Email already exists'})

        if data.get('is_admin'):
            if User.objects.filter(is_admin=True).exists():
                raise ValidationError({'message': 'There can only be one admin'})

        data['is_admin'] = True

        token = str(uuid4())
        data['verification_token'] = token

        sendemail(email, token)

        return data

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError('Please enter "email" and "password".')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')
                
                if user.is_admin and user.is_verified:                
                    refresh = RefreshToken.for_user(user)

                    return {
                            'message': 'Login successful.',
                            'username': user.username,
                            'access': str(refresh.access_token),
                            'refresh': str(refresh),
                            }
                else: 
                    raise serializers.ValidationError('You are not authorise to access this route. Please Verify before login')
            else:
                raise serializers.ValidationError('Incorrect email or password.')
        else:
            raise serializers.ValidationError(' Please enter "email" and "password".')


## =======================================================================================  ##

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def validate(self, data):
        password = data.get('password')
        if password:
            data['password'] = make_password(password)

        email = data.get('email')

        if User.objects.filter(email=email, is_customer=True).exists():
            raise ValidationError({'message': 'Email already exists for a customer'})

        data['is_customer'] = True

        token = str(uuid4())
        data['verification_token'] = token

        sendemail(email, token)

        return data


class CustomerLoginSerializer(serializers.Serializer):

    class Meta:
        model = User
        fields = ('email',)
        
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError('Please enter "email" and "password".')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError('User account is disabled.')
                
                if user.is_customer and user.is_verified: 
                
                    refresh = RefreshToken.for_user(user)

                    return {
                            'message': 'Login successful.',
                            'username': user.username,
                            'access': str(refresh.access_token),
                            'refresh': str(refresh),
                            }
                else: 
                    raise serializers.ValidationError('You are not authorise to access this route.')

            else:
                raise serializers.ValidationError('Incorrect email or password.')
        else:
            raise serializers.ValidationError('Must include "email" and "password".')