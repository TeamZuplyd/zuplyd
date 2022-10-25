/* eslint-disable-next-line */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, TableHead, FormControl, MenuItem, NativeSelect } from '@mui/material';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { useForm, FormProvider } from 'react-hook-form';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Grid } from '@mui/material';

// import { orders } from '../../../data/orders';
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export interface OrderTableProps {
  orders: any[];
}

export function OrderTable({ orders }: OrderTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [dropDown, setDropDown] = React.useState('');

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const changeStatus = async (text: string, index: number) => {
  //   //backendCall
  //   orders[index].status = text;
  //   const itemToSend = orders[index];
  //   await axios.post('http://localhost:5000/api/shopWarehouseRequest/update', itemToSend).then((res) => {
  //     console.log(res);
  //   });
  //   // console.log(orders[index]);
  // };

  const [dropDownValue, setDropDownValue] = React.useState('');

  const changeStatus = (event, obj) => {
    setDropDownValue(event.target.value);

    const body = {
      _id: obj._id,
      brand: obj.brand,
      item_code: obj.item_code,
      name: obj.name,
      quantity: obj.quantity,
      request: obj.request,
      requested_by: obj.requested_by,
      requested_date: obj.requested_date,
      required_by: obj.required_by,
      sentRequest: obj.sentRequest,
      status: event.target.value,
      warehouse_id: obj.warehouse_id,
      company_id: obj.company_id,
      __v: obj.__v,
    };

    axios.post('http://localhost:5000/api/shopWarehouseRequest/update', body).then((res) => {
      window.location.reload();
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Item Code</TableCell>
            <TableCell component="th">Name </TableCell>
            <TableCell component="th">Brand</TableCell>
            <TableCell component="th">Quantity</TableCell>
            <TableCell component="th">Required By</TableCell>
            <TableCell component="th">Requested By</TableCell>
            <TableCell component="th">Requested Date</TableCell>
            <TableCell component="th">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders).map((order, index) => (
            <TableRow key={order.item_code}>
              <TableCell component="th" scope="row">
                {order.item_code}
              </TableCell>
              <TableCell style={{}}>{order.name}</TableCell>
              <TableCell style={{}}>{order.brand}</TableCell>
              <TableCell style={{}}>{order.quantity}</TableCell>
              <TableCell style={{}}>{order.required_by}</TableCell>
              <TableCell style={{}}>{order.requested_by}</TableCell>
              <TableCell style={{}}>{order.requested_date}</TableCell>
              <TableCell style={{}}>
                <Grid container xs={12} rowGap={2} columnGap={4}>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ width: 180 }}>
                      <InputLabel id="demo-simple-select-label">{order.status}</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={(event, index) => changeStatus(event, order)}>
                        <MenuItem value={'Pending'}>In Progress</MenuItem>
                        <MenuItem value={'In delivery'}>In Delivery</MenuItem>
                        <MenuItem value={'Complete'}>Completed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={10}
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;

// type StatusDropDownProps = {
//   status: string;
//   item: string;
//   index: number;
//   orderObj: any;
// };
// function StatusDropDown({ status, item, orderObj }: StatusDropDownProps) {
//   const [selected, setSelected] = React.useState('');
//   console.log('statusssss');
//   console.log(status);

//   return (
//     <FormControl variant="standard" sx={{}}>
//       <NativeSelect
//         defaultValue={status}
//         value={selected}
//         id="demo-simple-select-standard"
//         onChange={(e) => {
//           // setSelected(e.target.value);
//           // changeStatus(e.target.value, index);
//         }}
//       >
//         <option value={'Pending'}>In Progress</option>
//         <option value={'In delivery'}>In Delivery</option>
//         <option value={'Complete'}>Completed</option>
//       </NativeSelect>
//     </FormControl>
//   );
// }
