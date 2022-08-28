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
  handleStatusChange: (event: React.ChangeEvent<{ value: unknown }>, ites: string) => void;
}

export function OrderTable({ orders, handleStatusChange }: OrderTableProps) {
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

  const changeStatus = (text: string, index: number) => {
    //backendCall
    orders[index].status = text;
    axios.post('http://localhost:7000/api/procurement/item/create', orders[index]);
    console.log(orders[index]);
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
                {/* {order.status} */}
                <StatusDropDown status={order.status} handleStatusChange={handleStatusChange} item={order.item_code} index={index} changeStatus={changeStatus} />
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
type StatusDropDownProps = {
  status: string;
  handleStatusChange: (event: React.ChangeEvent<{ value: unknown }>, item: string) => void;
  item: string;
  index: number;
  changeStatus: (text: string, index: number) => void;
};
function StatusDropDown({ status, handleStatusChange, item, changeStatus, index }: StatusDropDownProps) {
  const [selected, setSelected] = React.useState('');

  return (
    <FormControl variant="standard" sx={{}}>
      <NativeSelect
        defaultValue={status}
        value={selected}
        id="demo-simple-select-standard"
        onChange={(e) => {
          setSelected(e.target.value);
          changeStatus(e.target.value, index);
        }}
      >
        <option value={'Pending'}>In Progress</option>
        <option value={'in_delivery'}>In Delivery</option>
        <option value={'complete'}>Completed</option>
      </NativeSelect>
    </FormControl>
  );
}
