import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: '', password: '' });
  const navigate = useNavigate()

  const Login = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/accounts/adminsignin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: admin.email,
        password: admin.password,
      }),
    });

    const resp = await response.json();
    if (response.ok) {
      localStorage.setItem('admin_token', resp.data.access);
      localStorage.setItem('refresh', resp.data.refresh)
      toast.success(resp.message);
      setAdmin({email: '', password: ''})
      navigate('/admin')
    } else {
      const errorMessages = resp.non_field_errors || ['An error occurred.'];
      toast.error(errorMessages[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 box-border">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin FlightNotify</h2>
        <form method="POST" onSubmit={Login}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
              name="email"
              placeholder="Enter your email"
              value={admin.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
              name="password"
              placeholder="Enter your password"
              value={admin.password}
              onChange={handleChange}
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
      </div>
    </div>
  );
};

export default AdminLogin;
