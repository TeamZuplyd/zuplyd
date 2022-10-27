import { Box, Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  { field: 'col1', headerName: 'Item Name', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
  { field: 'col2', headerName: 'Required Quantity', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
  { field: 'col3', headerName: 'Required Date', width: 150, headerClassName: 'super-app-theme--header', cellClassName: 'super-app-theme--cell' },
];

function orders() {
  const [rowData, setRowData] = useState<any[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params);
    var rows: any[] = [];
    const comp_id = '6358d81729f842203326dd5f';
    const sup_id = JSON.parse(localStorage.getItem('userData') || '')?.user_id;
    axios.get(`http://localhost:5000/api/wh-prcurmnt-sup/findAllBySupplierIDAndCompany/${params['id']}/${sup_id}`).then((res) => {
      console.log(res.data);
      res.data.map((row) => {
        rows.push({
          id: row?._id,
          col1: row?.item?.item_name,
          col2: row?.requiredQuantity,
          col3: row?.requiredDate,
          col5: row?._id,
        });
      });
      setRowData(rows);
    });
  }, []);

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
              <DataGrid
                rows={rowData}
                columns={columns}
                onRowClick={(rowData) => {
                  console.log(rowData?.row?.id);
                  navigate(`/supplier/reports/${rowData?.row?.id}`);
                }}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default orders;
