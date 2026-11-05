import { useState, useEffect } from 'react';
import type { CustomerData } from '../types';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getCustomers, deleteCustomer } from '../customerapi';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import UpdateCustomer from './UpdateCustomer';
import { DialogActions, DialogContent, Dialog, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';


function CustomerList() {
    const [customers, setCustomers] = useState<CustomerData[] | null>();
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First name"},
        { field: "lastname", headerName: "Last name"},
        { field: "streetaddress", headerName: "Street Address", flex: 1},
        { field: "postcode", headerName: "Post Code"},
        { field: "city", headerName: "City"},
        { field: "email", headerName: "Email", flex: 1},
        { field: "phone", headerName: "Phone", flex: 1},
        {
            field: "edit",
            headerName: " ",
            renderCell: (params: GridRenderCellParams) =>
                <UpdateCustomer fetchCustomers={fetchCustomers} customer={params.row} />
        },

        {
            field: "delete",
            headerName: " ",
            renderCell: (params: GridRenderCellParams) =>
                <IconButton onClick={() => handleOpenDeleteDialog(params.row._links.self.href)}>
                    <DeleteIcon color= "error" />
                </IconButton>
        }
    ]

    const fetchCustomers = () => {
        getCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchCustomers();
    }, []);


    // Yes / No dialogi confirmaatio asiakkaan poistoa varten
    const [selectedUrl, setSelectedUrl] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleOpenDeleteDialog = (url: string) => {
        setSelectedUrl(url);
        setOpen(true);
    }

    const handleDelete = (url: string) => {
       deleteCustomer(url)
        .then(() => {
            fetchCustomers();
            setSnackbarOpen(true);
        })
        .catch(error => console.error(error))
    }

    return(
        <>
            <AddCustomer fetchCustomers={fetchCustomers} />
            <div style={{width: "95%", height: 800, marginTop: 10}}>
                <DataGrid
                    rows={customers ||[]}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    disableRowSelectionOnClick
                />
            </div>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle color="primary">Delete Customer</DialogTitle>
            

                <DialogContent>
                    Do you want to delete this customer?
                </DialogContent>

                <DialogActions>

                    <Button color="error" onClick={() => {
                        handleDelete(selectedUrl);
                        setOpen(false);
                    }}>Yes</Button>

                    <Button onClick={() => setOpen(false)}>No</Button>

                    
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                message= "Customer deletion complete"
                autoHideDuration={3500}
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    );
}


export default CustomerList