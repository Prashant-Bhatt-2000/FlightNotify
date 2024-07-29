import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
  
    localStorage.removeItem('customer_token');
    const refreshToken = localStorage.getItem('refresh');
  
    try {
      const response = await fetch(`${process.env.VITE_BACKEND_API}api/accounts/customersignout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
        credentials: 'include'
      });
  
      const resp = await response.json()

      console.log("logout : ", resp)
      if (response.ok) {
        toast.success('Logout Success');
        localStorage.removeItem('refresh');
        localStorage.removeItem('customer_token');
        navigate('/signin');
      } else {
        const errorData = await response.json();
        console.error('Logout error:', errorData.detail);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  const isLoggedIn = !!localStorage.getItem('customer_token');

  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-md shadow-md z-50 sticky top-0 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            className="h-8 w-8"
            src="https://img.icons8.com/clouds/100/000000/airplane-take-off.png"
            alt="Flight Logo"
          />
          <span className="text-blue-600 text-xl font-semibold">FlightNotify</span>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-blue-600 px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-100"
          >
            Home
          </Link>
          <Link
            to="/flights"
            className="text-blue-600 px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-100"
          >
            Flights
          </Link>
          {isLoggedIn && (
            <Link
              to="/bookings"
              className="text-blue-600 px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-100"
            >
              My Bookings
            </Link>
          )}
          <Link
            to="/contactus"
            className="text-blue-600 px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-100"
          >
            Contact Us
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="text-blue-600 px-3 py-2 rounded-md text-sm font-semibold bg-blue-100 bg-opacity-20 hover:bg-opacity-50"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signin"
              className="text-blue-600 px-3 py-2 rounded-md text-sm font-semibold bg-blue-100 bg-opacity-20 hover:bg-opacity-50"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <Link
            to="/"
            className="block text-blue-600 px-3 py-2 rounded-md text-base font-semibold hover:bg-blue-100"
          >
            Home
          </Link>
          <Link
            to="/flights"
            className="block text-blue-600 px-3 py-2 rounded-md text-base font-semibold hover:bg-blue-100"
          >
            Flights
          </Link>
          {isLoggedIn && (
            <Link
              to="/bookings"
              className="block text-blue-600 px-3 py-2 rounded-md text-base font-semibold hover:bg-blue-100"
            >
              My Bookings
            </Link>
          )}
          <Link
            to="/contact"
            className="block text-blue-600 px-3 py-2 rounded-md text-base font-semibold hover:bg-blue-100"
          >
            Contact Us
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="block text-blue-600 px-3 py-2 rounded-md text-base font-semibold bg-blue-100 bg-opacity-20 hover:bg-opacity-50"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/signin"
              className="block text-blue-600 px-3 py-2 rounded-md text-base font-semibold bg-blue-100 bg-opacity-20 hover:bg-opacity-50"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
