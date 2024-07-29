import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const Signin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/accounts/customersignin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: customer.email,
          password: customer.password,
        }),
      });

      const resp = await response.json();

      if (response.ok) {
        localStorage.setItem('customer_token', resp.data.access);
        localStorage.setItem('refresh', resp.data.refresh)
        toast.success('Login successful');
        setCustomer({ email: '', password: '' });
        navigate('/');
      } else {
        const errorMessages = resp.non_field_errors || ['An error occurred.'];
        toast.error(errorMessages[0]);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 box-border">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login to FlightNotify</h2>
        <form method="POST" onSubmit={Signin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter your email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter your password"
              value={customer.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
