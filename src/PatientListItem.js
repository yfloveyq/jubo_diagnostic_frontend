import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import * as React from "react";

export default function PatientList(patient) {

    const handleClick = (orders) =>  {
        // Construct the order messages
        const orderMessages = orders.map(order => order.Message).join("\n");

        // Show the patient's orders in an alert dialog
        alert(`Patient's Orders:\n${orderMessages}`);
    };

    return (
        <ListItem key={patient.ID}>
            <ListItemButton onClick={() => handleClick(patient.Orders)}>
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={patient.Name}
                />
            </ListItemButton>
        </ListItem>
    );
}
