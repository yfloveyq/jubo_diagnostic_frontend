import * as React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import PatientListItem from './PatientListItem';

export default function PatientList(patients) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <List>
                {patients.map(patient => (
                    PatientListItem(patient)
                ))}
            </List>
        </Box>
    );
}
