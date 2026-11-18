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
import { getTrainings, deleteTraining } from '../api/trainingsapi';
import AddTraining from './AddTraining';


function TrainingList() {
    const [trainings, setTrainings] = useState<TrainingData[] | null>();
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        {
        field: "customerName", headerName: "Customer", flex: 1, valueGetter: (_value, row) =>
            `${row.customer.firstname} ${row.customer.lastname}`
        },

        {
            field: "date", headerName: "Date", flex: 1, valueFormatter: (_value) =>
            dayjs(_value).format("DD.MM.YYYY HH:mm")
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

     const fetchTrainings = () => {
            getTrainings()
                .then(data => setTrainings(data))
                .catch(error => console.error(error))
        }

    useEffect(() => {
        fetchTrainings();
    }, []);


    // Yes / No dialogi confirmaatio asiakkaan poistoa varten
    const [selectedId, setSelectedId] = useState<number | null>(null);
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

        const url = `${import.meta.env.VITE_API_URL}trainings/${selectedId}`;

        deleteTraining(url)
            .then(() => {
                fetchTrainings();
                setSnackbarOpen(true);
                handleCloseDeleteDialog();
            })
            .catch(error => console.error(error));
    };

    return(
            <>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <AddTraining fetchTrainings={fetchTrainings} />
                </div>
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