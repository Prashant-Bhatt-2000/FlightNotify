import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contact Us</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Emails</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-blue-600 hover:underline">
              <FaEnvelope className="h-6 w-6 mr-2" />
              <a href="mailto:support@example.com">support@example.com</a>
            </li>
            <li className="flex items-center text-blue-600 hover:underline">
              <FaEnvelope className="h-6 w-6 mr-2" />
              <a href="mailto:info@example.com">info@example.com</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Phone Numbers</h2>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-800">
              <FaPhone className="h-6 w-6 mr-2" />
              +1 (123) 456-7890
            </li>
            <li className="flex items-center text-gray-800">
              <FaPhone className="h-6 w-6 mr-2" />
              +1 (987) 654-3210
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
