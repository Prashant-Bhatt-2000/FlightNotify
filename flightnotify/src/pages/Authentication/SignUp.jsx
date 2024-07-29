import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {

  const navigate = useNavigate()

  const [customer, setCustomer] = useState({ username: '', email: "", password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const SignUp = async (e) => {
    e.preventDefault()
    const response = await fetch(`${process.env.VITE_BACKEND_API}/api/accounts/customersignup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({
        username: customer.username, email: customer.email, password: customer.password
      })
    })

    const resp = await response.json();
    console.log(resp)
    if (response.ok) {
      toast.success(resp.message);
      setCustomer({username:  '', email: '', password: ''})
      navigate('/signin')
    } else {
      if(resp.email){ 
        toast.error(resp.email[0]);
      }else if(resp.password){ 
        toast.error(resp.password[0])
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" style={{ marginTop: '-4rem' }}>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up for FlightNotify</h2>
        <form method='POST'onSubmit={SignUp} >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Username</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter your username" name="username" value={customer.username} onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter your email" name='email' value={customer.email} onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
              placeholder="Enter your password" name='password' value={customer.password} onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-3 py-2 rounded-md font-semibold hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
