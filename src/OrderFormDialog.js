import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function OrderFormDialog(selectedPatient, patients, setPatients, formOrder, setFormOrder, setOrders, action, formOpen, setFormOpen, setSnackbarOpen) {

    const handleClose = () => {
        setFormOpen(false);
    };

    const handleSave = () => {
        formOrder.Message = document.getElementById("orderMessage").value;
        setFormOrder(formOrder);
        if (action === "新增") {
            let requestBody = {"Patient": patients[selectedPatient], "Order": formOrder};
            fetch('http://localhost:8080/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => response.json())
                .then(data => {
                    patients[selectedPatient].Orders.push(data); // Update the patient's Orders
                    setPatients([...patients]); // Update the patients state
                    setOrders(patients[selectedPatient].Orders);
                    patients[selectedPatient].OrderList = patients[selectedPatient].Orders.map(order => order.ID);
                    handleClose();
                })
                .catch(error => {
                    console.error('Error adding order:', error);
                    setSnackbarOpen(true);
                });
        } else {
            fetch('http://localhost:8080/orders/' + formOrder.ID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formOrder),
            })
                .then(response => response.json())
                .then(data => {
                    patients[selectedPatient].Orders = patients[selectedPatient].Orders.map(o => {
                        if (data.ID === o.ID) {
                            return data;
                        }
                        return o;
                    });
                    setPatients(patients);
                    setOrders(patients[selectedPatient].Orders);
                    handleClose();
                })
                .catch(error => {
                    console.error('Error adding order:', error);
                    setSnackbarOpen(true);
                });
        }
    };

    return (
        <React.Fragment>
            <Dialog open={formOpen} onClose={handleClose}>
                <DialogTitle>{action}醫囑</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        請輸入醫囑：
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="orderMessage"
                        label="醫囑"
                        type="text"
                        fullWidth
                        variant="standard"
                        defaultValue={formOrder.Message}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleSave}>{action}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
