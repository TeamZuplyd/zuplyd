import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/header/header';
import LaunchIcon from '@mui/icons-material/Launch';
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function getQuotation(params) {
  console.log(params);
  return params;
}

const rows: GridRowsProp = [
  { id: 33443441, col1: 'John Keells', col2: 5, col3: 1 },
  { id: 23467767, col1: 'Softlogic', col2: 2, col3: 3 },
  { id: 32268723, col1: 'Damro', col2: 6, col3: 2 },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Company ID', width: 150 },
  { field: 'col1', headerName: 'Company Name', width: 150 },
  {
    field: 'col2',
    headerName: 'Quotations Remaining',
    width: 150,
    renderCell: (params) => (
      <>
        <Typography style={{ marginRight: 6 }}>{params.value}</Typography>
        <LaunchIcon style={{ cursor: 'pointer' }} onClick={() => console.log(params.value)} />
      </>
    ),
  },
  {
    field: 'col3',
    headerName: 'Orders Remaining',
    width: 150,
    renderCell: (params) => (
      <>
        <Typography style={{ marginRight: 6 }}>{params.value}</Typography>
        <LaunchIcon style={{ cursor: 'pointer' }} onClick={() => console.log(params.value)} />
      </>
    ),
  },
];

export function CompaniesTable() {
  const [rowsData, setRows] = React.useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(location);
    const supplier_id = JSON.parse(localStorage.getItem('userData') || '')?.user_id;
    var dataRows: any[] = [];
    axios.get(`http://localhost:5000/api/wh-prcurmnt-sup/findAllBySupplierID/${supplier_id}`).then((res) => {
      res.data.map((row) =>
        dataRows.push({
          id: row?._id,
          col1: row?.company_name[0],
          col2: row?.count,
        })
      );
      console.log(dataRows);
      setRows(dataRows);
    });
  }, []);

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rowsData}
        columns={columns}
        onRowClick={(rowData) => {
          console.log(rowData.row.id);
          navigate(`/supplier/orders/${rowData.row.id}`);
        }}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}

function companies() {
  return (
    <>
      <Header title={'Companies'} />
      <Grid container item xs={12} alignItems="center" justifyContent="center">
        <Grid container xs={12} direction="column" rowSpacing={1} style={{ maxWidth: '70%' }}>
          <CompaniesTable />
        </Grid>
      </Grid>
    </>
  );
}

export default companies;
