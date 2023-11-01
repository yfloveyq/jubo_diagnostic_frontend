import {ListItem, ListItemText} from "@mui/material";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OrderListItem(order, handleEditOrder, handleDeleteOrder) {
    return (
        <ListItem key={order.ID} divider>
            <ListItemText primary={order.Message} />
            <IconButton edge="end" aria-label="edit" onClick={() => handleEditOrder(order)}>
                <EditIcon/>
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteOrder(order)}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
}
