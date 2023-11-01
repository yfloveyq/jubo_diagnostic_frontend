import './App.css';
import * as React from 'react';
import '@fontsource/roboto/700.css';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Header from './Header'
import PatientList from "./PatientList";
import OrderListDialog from "./OrderListDialog";
import {useEffect, useState} from "react";
import OrderFormDialog from "./OrderFormDialog";
import Snackbar from "@mui/material/Snackbar";
import Notification from "./Notification";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const lightTheme = createTheme({ palette: { mode: 'light' } });

function App() {
    const [action, setAction] = useState("新增");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(0);
    const [orders, setOrders] = useState([]);
    const [formOrder, setFormOrder] = useState({});
    const [patients, setPatients] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Fetch patients using useEffect
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('http://localhost:8080/patients');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatients(data); // Set the fetched patients in state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPatients();
    }, []); // Empty dependency array to run this effect only once when the component mounts


    return (
        <div className="App">
            <Header></Header>
            <Container sx={{paddingTop: 3}}>
                <ThemeProvider theme={lightTheme}>
                    <Box
                        sx={{
                            borderRadius: 2,
                            bgcolor: 'background.default',
                            display: 'grid',
                        }}
                    >
                        <Item elevation={4}>
                            {PatientList(patients, setSelectedPatient, setOrders, setDialogOpen)}
                        </Item>
                    </Box>
                </ThemeProvider>
            </Container>
            {OrderListDialog(selectedPatient, patients, setPatients, orders, setOrders, setFormOrder, dialogOpen, setDialogOpen, setAction, setFormOpen, setSnackbarOpen)}
            {OrderFormDialog(selectedPatient, patients, setPatients, formOrder, setFormOrder, setOrders, action, formOpen, setFormOpen, setSnackbarOpen)}
            {Notification(snackbarOpen, setSnackbarOpen)}
        </div>
    );
}

export default App;
