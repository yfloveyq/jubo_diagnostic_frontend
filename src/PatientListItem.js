import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";

export default function PatientListItem(patient, index, setSelectedPatient, setOrders, setDialogOpen) {

    const handleClick = () => {
        setSelectedPatient(index);
        setOrders(patient.Orders);
        setDialogOpen(true);
    };

    return (
        <ListItem key={patient.ID} divider>
            <ListItemButton onClick={handleClick}>
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
