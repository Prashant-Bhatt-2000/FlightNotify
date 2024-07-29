import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

const MyBookings = () => {
  // State to hold the bookings data
  const [bookings, setBookings] = useState([]);

  // Fetch bookings data from the backend
  const myBookings = async () => {
    const access = localStorage.getItem('customer_token');
    try {
      const response = await fetch(`${process.env.VITE_BACKEND_API}/api/flight/mybookings`, {
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
          'Authorization': `Bearer ${access}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBookings(data); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Fetch bookings when the component mounts
  useEffect(() => {
    myBookings();
  }, []);

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography variant="h6" component="p" color="textSecondary">
          No Bookings Available
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Flight Number</TableCell>
                <TableCell>Departure City</TableCell>
                <TableCell>Arrival City</TableCell>
                <TableCell>Departure Date</TableCell>
                <TableCell>Arrival Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.flight_number}</TableCell>
                  <TableCell>{booking.departure_city}</TableCell>
                  <TableCell>{booking.arrival_city}</TableCell>
                  <TableCell>{booking.departure_date}</TableCell>
                  <TableCell>{booking.arrival_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default MyBookings;
