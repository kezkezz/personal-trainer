import { useState, useEffect } from 'react';
import type { CustomerData } from '../types';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getCustomers } from '../customerapi';


function CustomerList() {
    const [customers, setCustomers] = useState<CustomerData[] | null>();

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First name"},
        { field: "lastname", headerName: "Last name"},
        { field: "streetaddress", headerName: "Street Address", flex: 1},
        { field: "postcode", headerName: "Post Code"},
        { field: "city", headerName: "City"},
        { field: "email", headerName: "Email", flex: 1},
        { field: "phone", headerName: "Phone", flex: 1},
    ]

    const fetchCustomers = () => {
        getCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => console.error(error))
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return(
        <div style={{width: "95%", height: 800}}>
            <DataGrid
                rows={customers ||[]}
                columns={columns}
                getRowId={row => row._links.self.href}
            />
        </div>
        
    );
}


export default CustomerList