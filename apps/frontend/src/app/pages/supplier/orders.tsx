import { Box, Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import React from 'react';
import Header from '../../components/header/header';
import OrderTable from '../../components/supplier/order-table';

const rows: GridRowsProp = [
  { id: 33443441, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 23467767, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
  { id: 32268723, col1: 'John Keells', col2: 'Nike Air Max', col3: '2022/01/05', col4: 544.0, col5: 'cancelled' },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
  { field: 'col1', headerName: 'Customer', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
  { field: 'col2', headerName: 'Order', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
  { field: 'col3', headerName: 'Delivery Date', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
  { field: 'col4', headerName: 'Delivery Pricing ($)', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
  {
    field: 'col5',
    headerName: 'Delivery Status',
    width: 150,
    headerClassName: 'super-app-theme--header',
    cellClassName: 'super-app-theme--cell',
    renderCell: (params) => <Chip variant="outlined" label="Cancelled" color="error" />,
  },
];

function orders() {
  return (
    <>
      <Header title={'Orders'} />
      <Grid container justifyContent="center">
        <Grid xs={9} alignItems="center" justifyContent="center">
          {/* Unassigned Requests */}
          {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <OrderTable />
          </Box> */}
          <div style={{ width: '100%' }}>
            <Box
              sx={{
                height: 700,
                width: '100%',
                '& .super-app-theme--header': {
                  backgroundColor: 'black',
                  color: 'white',
                  fontWeight: 500,
                },
                '& .super-app-theme--cell': {
                  backgroundColor: 'white',
                  fontWeight: 400,
                },
              }}
            >
              <DataGrid rows={rows} columns={columns} onRowClick={(rowData) => console.log(rowData)} components={{ Toolbar: GridToolbar }} />
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default orders;
