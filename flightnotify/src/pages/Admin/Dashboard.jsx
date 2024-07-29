import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Modal,
    Grid,
    Card,
    CardContent,
    FormControl, 
    MenuItem, 
    InputLabel, 
    Select
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { toast } from 'react-toastify';

const initialFlights = [
    { id: 1, flightNumber: 'AA123', origin: 'NYC', destination: 'LA', departure_time: '2024-07-30T10:30', arrival_time: '2024-07-30T14:30', status: 'On Time' },
    { id: 2, flightNumber: 'BA456', origin: 'LON', destination: 'PAR', departure_time: '2024-07-30T15:00', arrival_time: '2024-07-30T16:00', status: 'Delayed' },
    // Add more flight data as needed
];

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [flights, setFlights] = useState([]);
    const [newFlight, setNewFlight] = useState({ origin: '', destination: '', departure_time: '', arrival_time: '', status: '' });
    const [selectedFlight, setSelectedFlight] = useState(null);

    const navigate = useNavigate();
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    };

    const handleOpenEditModal = (flight) => {
        // Ensure datetime-local format for the modal
        setSelectedFlight({
            ...flight,
            departure_time: flight.departure_time.substring(0, 16),
            arrival_time: flight.arrival_time.substring(0, 16)
        });
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedFlight(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFlight(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedFlight(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateFlight = async () => {
        try {
            const access = localStorage.getItem('admin_token');
            const response = await fetch(`${process.env.VITE_BACKEND_API}/api/flight/createflight`, { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
                }, 
                body: JSON.stringify({
                    origin: newFlight.origin,
                    destination: newFlight.destination,
                    departure_time: newFlight.departure_time,
                    arrival_time: newFlight.arrival_time,
                    status: newFlight.status
                })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success('Flight Created')
                navigate('/admin')
                setFlights([...flights, result]);
                handleCloseCreateModal();
            } else {
                toast.error('Some error. Please try again')
                console.error(result);
            }
        } catch (error) {
            console.error('Failed to create flight:', error);
        }
    };
    

    const access = localStorage.getItem('admin_token');

    const GetFlights = async ()=> { 
        const response = await fetch(`${process.env.VITE_BACKEND_API}/api/flight/getflights`, { 
            method: 'GET', 
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })

        const resp = await response.json()

        setFlights(resp)

        console.log(resp)
    }
    useEffect(()=> { 
        GetFlights()
    }, [])

    const handleUpdateFlight = async () => {
        try {
            const access = localStorage.getItem('admin_token');
            const response = await fetch(`${process.env.VITE_BACKEND_API}/api/flight/updateflight/${selectedFlight.id}`, { 
                method: 'PUT', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
                }, 
                body: JSON.stringify(selectedFlight)
            });

            const result = await response.json();
            console.log(result)

            if (response.ok) {
                setFlights(flights.map(flight => flight.id === selectedFlight.id ? selectedFlight : flight));
                handleCloseEditModal();
            } else {
                console.error(result);
            }
        } catch (error) {
            console.error('Failed to update flight:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button onClick={() => setSelectedTab(0)}>
                            <ListItemText primary="View Flights" />
                        </ListItem>
                        <ListItem button onClick={() => setSelectedTab(1)}>
                            <ListItemText primary="Create Flight" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {selectedTab === 0 && (
                    <Box>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Flight Dashboard
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Flight Code</TableCell>
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
                                                                <Button variant="contained" color="primary" onClick={() => handleOpenEditModal(flight)}>Edit</Button>
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
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Create Flight
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
                            New Flight
                        </Button>
                        <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, mx: 'auto', my: '5%', width: 400 }}>
                                <TextField label="Origin" name="origin" value={newFlight.origin} onChange={handleChange} sx={{ mb: 2 }} />
                                <TextField label="Destination" name="destination" value={newFlight.destination} onChange={handleChange} sx={{ mb: 2 }} />
                                <TextField
                                    label="Departure Time"
                                    name="departure_time"
                                    type="datetime-local"
                                    value={newFlight.departure_time}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="Arrival Time"
                                    name="arrival_time"
                                    type="datetime-local"
                                    value={newFlight.arrival_time}
                                    onChange={handleChange}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <FormControl sx={{ mb: 2 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={newFlight.status}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="ontime">On Time</MenuItem>
                                        <MenuItem value="delayed">Delayed</MenuItem>
                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="primary" onClick={handleCreateFlight}>Create</Button>
                            </Box>
                        </Modal>
                    </Box>
                )}
                <Modal open={openEditModal} onClose={handleCloseEditModal}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, mx: 'auto', my: '5%', width: 400 }}>
                        {selectedFlight && (
                            <>
                                <TextField label="Origin" name="origin" value={selectedFlight.origin} onChange={handleEditChange} sx={{ mb: 2 }} />
                                <TextField label="Destination" name="destination" value={selectedFlight.destination} onChange={handleEditChange} sx={{ mb: 2 }} />
                                <TextField
                                    label="Departure Time"
                                    name="departure_time"
                                    type="datetime-local"
                                    value={selectedFlight.departure_time}
                                    onChange={handleEditChange}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="Arrival Time"
                                    name="arrival_time"
                                    type="datetime-local"
                                    value={selectedFlight.arrival_time}
                                    onChange={handleEditChange}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <FormControl sx={{ mb: 2 }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={selectedFlight.status}
                                        onChange={handleEditChange}
                                    >
                                        <MenuItem value="ontime">On Time</MenuItem>
                                        <MenuItem value="delayed">Delayed</MenuItem>
                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" color="primary" onClick={handleUpdateFlight}>Update</Button>
                            </>
                        )}
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default Dashboard;
