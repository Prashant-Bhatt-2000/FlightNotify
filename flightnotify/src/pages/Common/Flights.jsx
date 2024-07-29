import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Toolbar,
} from '@mui/material';
import { toast } from 'react-toastify';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [openBookModal, setOpenBookModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState('');
  const access = localStorage.getItem('customer_token');

  const GetFlights = async () => {
    const response = await fetch(`${process.env.VITE_BACKEND_API}/api/flight/getflights`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
      }
    });

    const resp = await response.json();
    setFlights(resp);
  };

  useEffect(() => {
    GetFlights();
  }, []);

  const handleOpenBookModal = (flight) => {
    setSelectedFlight(flight);
    setOpenBookModal(true);
  };

  const handleCloseBookModal = () => {
    setOpenBookModal(false);
    setSelectedFlight(null);
    setSeats(1);
    setName('');
  };


  const handleBookFlight = async () => {
    const api = `${process.env.VITE_BACKEND_API}/api/flight/bookflight`;

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`,
        },
        body: JSON.stringify({ flight_number: selectedFlight.flight_number,
            seats: seats,
            departure_city: selectedFlight.origin,
            arrival_city: selectedFlight.destination,
            departure_date: selectedFlight.departure_time,
            arrival_date: selectedFlight.arrival_time,}),
      });
  
      const resp = await response.json();
    
      if (response.ok) {
        console.log('Booking successful:', resp);
        toast.success(resp.message || 'Flight booked successfully!');
      } else {
        console.error('Booking failed:', resp);
        toast.error(resp.message || 'Failed to book flight. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred. Please try again.');
    }
    
    handleCloseBookModal();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Toolbar />
      <Typography variant="h4" component="h2" gutterBottom>
        Flights
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Flight Number</TableCell>
                      <TableCell>Origin</TableCell>
                      <TableCell>Destination</TableCell>
                      <TableCell>Departure Time</TableCell>
                      <TableCell>Arrival Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {flights.map(flight => (
                      <TableRow key={flight.id}>
                        <TableCell>{flight.flight_number}</TableCell>
                        <TableCell>{flight.origin}</TableCell>
                        <TableCell>{flight.destination}</TableCell>
                        <TableCell>{flight.departure_time}</TableCell>
                        <TableCell>{flight.arrival_time}</TableCell>
                        <TableCell>{flight.status}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" onClick={() => handleOpenBookModal(flight)}>
                            Book Flight
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Modal open={openBookModal} onClose={handleCloseBookModal}>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, mx: 'auto', my: '5%', width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Book Flight
          </Typography>
          <TextField
            label="Number of Seats"
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            margin="normal"
            InputProps={{ inputProps: { min: 1 } }}
          />
          <TextField
            label="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleBookFlight} sx={{ mt: 2 }}>
            Book
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Flights;
