import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/SignUp';
import AdminLogin from './pages/Authentication/AdminLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Admin/Dashboard';
import Flights from './pages/Common/Flights';
import MyBookings from './pages/Customers/MyBookings';
import ContactUs from './pages/Customers/ContactUs';

const App = () => {
  const adminToken = localStorage.getItem('admin_token');
  const customerToken = localStorage.getItem('customer_token');

  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Public Routes */}
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Customer Routes */}
        {customerToken ? (
          <>
          <Route path="/flights" element={<Flights />} />
            <Route path="/bookings" element={<MyBookings />} />
          </>
        ) : (
          <Route path="/signin" element={<Navigate to='/signin' />} />
        )}

        {/* Admin Routes */}
        {adminToken ? (
          <Route path='/admin' element={<Dashboard />} />
        ) : (
          <Route path='/admin' element={<Navigate to='/admin/login' />} />
        )}

      </Routes>
    </Router>
  );
};

export default App;
