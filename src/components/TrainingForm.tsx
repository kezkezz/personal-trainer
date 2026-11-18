import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import type { CustomerData } from "../types";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import React from "react";

type TrainingData = {
    customerUrl: string;
    date: Dayjs | null;
    activity: string;
    duration: number;
}

type TrainingFormProps = {
    training: TrainingData;
    setTraining: React.Dispatch<React.SetStateAction<TrainingData>>;
    customers: CustomerData[];
}

function TrainingForm({ training, setTraining, customers }: TrainingFormProps) {

    return(

        <DialogContent>

            <TextField
                select
                required
                label="Customer"
                value={training.customerUrl}
                onChange={event => setTraining({ ...training, customerUrl: event.target.value })}
                fullWidth
                margin="dense"
            >
                {customers.map(customer => (
                    <MenuItem
                        key={customer._links?.self.href}
                        value={customer._links?.self.href}
                    >
                        {customer.firstname} {customer.lastname}
                        
                    </MenuItem>
                ))}
            </TextField>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Training date"
                    value={training.date}
                    onChange={newDate => setTraining({ ...training, date: newDate })}
                    sx={{ mt: 2, width: "100%" }}
                />
            </LocalizationProvider>

            <TextField
                required
                label="Activity"
                value={training.activity}
                onChange={event => setTraining({ ...training, activity: event.target.value })}
                fullWidth
                margin="dense"
            />

            <TextField
                required
                label="Duration (min)"
                type="number"
                value={training.duration}
                onChange={event => setTraining({ ...training, duration: Number(event.target.value) })}
                fullWidth
                margin="dense"
            />

        </DialogContent>
    );
}

export default TrainingForm;