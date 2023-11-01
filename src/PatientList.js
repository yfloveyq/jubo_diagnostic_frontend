import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import PatientListItem from './PatientListItem';
import OrderListDialog from "./OrderListDialog";

export default function PatientList(patients, setSelectedPatient, setOrders, setDialogOpen) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <List>
                {patients.map((patient, index) => (
                    PatientListItem(patient, index, setSelectedPatient, setOrders, setDialogOpen)
                ))}
            </List>
        </Box>
    );
}
