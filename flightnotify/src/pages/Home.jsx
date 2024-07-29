import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>

    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to FlightNotify</h1>
          <p className="mt-4 text-lg">Book your flights easily and quickly</p>
          <Link to='/flights'
            className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
          >
            Get Started
          </Link>
        </div>
      </header>
{/* 
      <section id="search" className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Search Flights</h2>
            <form className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700">From</label>
                  <input
                    type="text"
                    placeholder="City or Airport"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">To</label>
                  <input
                    type="text"
                    placeholder="City or Airport"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Departure Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Return Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Passengers</label>
                  <input
                    type="number"
                    placeholder="1"
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                  >
                    Search Flights
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section> */}

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">Convenient Booking</h3>
              <p className="mt-4 text-gray-600">
                Book flights easily and quickly with our user-friendly platform.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">Affordable Prices</h3>
              <p className="mt-4 text-gray-600">
                Find the best deals and discounts on flights to your favorite destinations.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">24/7 Support</h3>
              <p className="mt-4 text-gray-600">
                Our customer support team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
