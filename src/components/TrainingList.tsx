import { useState, useEffect } from 'react';
import type { TrainingData } from '../types';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import { DialogActions, DialogContent, Dialog, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import dayjs from "dayjs";


function TrainingList() {
    const [trainings, setTrainings] = useState<TrainingData[] | null>();
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        {
        field: "customerName", headerName: "Customer", flex: 1, valueGetter: (value, row) =>
            `${row.customer.firstname} ${row.customer.lastname}`
        },

        {
            field: "date", headerName: "Date", flex: 1, valueFormatter: (value) =>
            dayjs(value).format("DD.MM.YYYY HH:mm")
        },

        { field: "activity", headerName: "Activity", flex: 1},

        { field: "duration", headerName: "Duration (min)", flex: 1},

        { field: "delete", headerName: " ",
            renderCell: (params: GridRenderCellParams) =>
                <IconButton onClick={() => handleOpenDeleteDialog(params.row.id)}>
                    <DeleteIcon color="error" />
                </IconButton>
        }
    ];

    useEffect(() => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching trainings");
            }

            return response.json();
        })
        .then(data => setTrainings(data))
        .catch(error => console.error(error))
    }, []);


    // Yes / No dialogi confirmaatio asiakkaan poistoa varten
    const [selectedId, setSelectedId] = useState<number | null>();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleOpenDeleteDialog = (id: number) => {
        setSelectedId(id);
        setOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setOpen(false);
        setSelectedId(null);
    };

    const handleDelete = () => {
    if (selectedId === null) return;

    fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${selectedId}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when deleting training");
            }

            setTrainings(current =>
                current?.filter(training => training.id !== selectedId) ?? []
            );

            setSnackbarOpen(true);
            handleCloseDeleteDialog();
        })
        .catch(error => console.error(error));
};

    return(
            <>
                <div style={{ width: "95%", height: 800, marginTop: 10 }}>
                    <DataGrid
                        rows={trainings || []}
                        columns={columns}
                        getRowId={row => row.id}
                        autoPageSize
                        disableRowSelectionOnClick
                    />
                </div>
    
                <Dialog open={open} onClose={handleCloseDeleteDialog}>
                    <DialogTitle color="primary">Delete Training</DialogTitle>
    
                    <DialogContent>Do you want to delete this training?</DialogContent>
    
                    <DialogActions>
                        <Button color="error" onClick={handleDelete}>Yes</Button>
    
                        <Button onClick={handleCloseDeleteDialog}>No</Button>
                    </DialogActions>
                </Dialog>
    
                <Snackbar
                    open={snackbarOpen}
                    message="Training deletion complete"
                    autoHideDuration={3500}
                    onClose={() => setSnackbarOpen(false)}
                />
            </>
        );
}

export default TrainingList;