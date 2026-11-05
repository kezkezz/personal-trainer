import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import type { CustomerData } from "../types";
import React from 'react';

type CustomerFormProps = {
    customer: CustomerData
    setCustomer: React.Dispatch<React.SetStateAction<CustomerData>>
}

function CustomerForm({ customer, setCustomer }: CustomerFormProps) {
    return(
        <DialogContent>
        
            <TextField
                required
                margin="dense"
                label="First Name"
                value={customer.firstname}
                onChange={event => setCustomer({ ...customer, firstname: event.target.value})}
                fullWidth
                variant="standard"
            />
        
            <TextField
                required
                margin="dense"
                label="Last Name"
                value={customer.lastname}
                onChange={event => setCustomer({ ...customer, lastname: event.target.value})}
                fullWidth
                variant="standard"
            />
        
            <TextField
                required
                margin="dense"
                label="Street Address"
                value={customer.streetaddress}
                onChange={event => setCustomer({ ...customer, streetaddress: event.target.value})}
                fullWidth
                variant="standard"
            />
        
            <TextField
                required
                margin="dense"
                label="Post Code"
                value={customer.postcode}
                onChange={event => setCustomer({ ...customer, postcode: event.target.value})}
                fullWidth
                variant="standard"
            />
        
            <TextField
                required
                margin="dense"
                label="City"
                value={customer.city}
                onChange={event => setCustomer({ ...customer, city: event.target.value})}
                fullWidth
                variant="standard"
            />
        
            <TextField
                required
                margin="dense"
                label="Email"
                value={customer.email}
                onChange={event => setCustomer({ ...customer, email: event.target.value})}
                fullWidth
                variant="standard"
            />
        
            <TextField
                required
                margin="dense"
                label="Phone Number"
                value={customer.phone}
                onChange={event => setCustomer({ ...customer, phone: event.target.value})}
                fullWidth
                variant="standard"
            />
        
        </DialogContent>
    );
}

export default CustomerForm