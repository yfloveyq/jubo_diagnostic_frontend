import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import OrderListItem from "./OrderListItem"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderListDialog(selectedPatient, patients, setPatients, orders, setOrders, setFormOrder, dialogOpen, setDialogOpen, setAction, setFormOpen, setSnackbarOpen) {
    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleAddOrder = () => {
        console.log("clicked add order");
        setAction("新增");
        setFormOpen(true);
        setFormOrder({"Message":""});
    };

    const handleEditOrder = (order) => {
        console.log("clicked edit" + order.Message);
        setAction("編輯");
        setFormOpen(true);
        setFormOrder(order);
    };

    const handleDeleteOrder = (order) => {
        fetch('http://localhost:8080/orders/' + order.ID, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patients[selectedPatient]),
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                patients[selectedPatient].OrderList = data.OrderList.filter(oid => oid !== order.ID);
                patients[selectedPatient].Orders = data.Orders.filter(o => o.ID !== order.ID);
                setPatients(patients);
                setOrders(patients[selectedPatient].Orders);
            })
            .catch(error => {
                console.error('Error adding order:', error);
                setSnackbarOpen(true);
            });
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={dialogOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            醫囑清單
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleAddOrder} variant="outlined">
                            新增醫囑
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    {orders.map(order => (
                        OrderListItem(order, handleEditOrder, handleDeleteOrder)
                    ))}
                </List>
            </Dialog>
        </React.Fragment>
    );
}
