import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import type { CustomerData } from "../types";
import { getCustomers } from "../api/customerapi";
import TrainingForm from "./TrainingForm";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

type AddTrainingProps = {
    fetchTrainings: () => void;
}

export default function AddTraining(props: AddTrainingProps) {

    const [open, setOpen] = useState(false);

    type TrainingData = {
        customerUrl: string;
        date: Dayjs | null;
        activity: string;
        duration: number;
    }

    const emptyTraining = {
        customerUrl: "",
        date: dayjs(),
        activity: "",
        duration: 60
    };

    const [training, setTraining] = useState<TrainingData>(emptyTraining);
    const [customers, setCustomers] = useState<CustomerData[]>([]);

    useEffect(() => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error(error));
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        if (!training.date) return;

        fetch(import.meta.env.VITE_API_URL + "trainings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: training.date.toISOString(),
                activity: training.activity,
                duration: training.duration,
                customer: training.customerUrl
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong in addition");
            }
            return response.json();
        })
        .then(() => {
            props.fetchTrainings();
            setTraining(emptyTraining);
            handleClose();
        })
        .catch(error => console.error(error));
    }

    return(
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle color="info">New Training</DialogTitle>

                <TrainingForm
                    training={training}
                    setTraining={setTraining}
                    customers={customers}
                />

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}