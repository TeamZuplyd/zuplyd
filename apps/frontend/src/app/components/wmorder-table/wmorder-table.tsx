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
import { Button, TableHead } from '@mui/material';
import axios from 'axios';

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

export interface WMOrderTableProps {
  orders: any[];
}

export function WMOrderTable({ orders }: WMOrderTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const confirmDelivery = (item: any) => {
    console.log('itemmmmmm');
    console.log(item);

    const body = {
      _id: item._id,
      brand: item.brand,
      item_code: item.item_code,
      name: item.name,
      quantity: item.quantity,
      request: item.request,
      requested_by: item.requested_by,
      requested_date: item.requested_date,
      required_by: item.required_by,
      sentRequest: item.sentRequest,
      status: 'Complete',
      warehouse_id: item.warehouse_id,
      company_id: item.company_id,
      __v: item.__v,
    };

    // axios.post('http://localhost:5000/api/shopWarehouseRequest/update', body).then((res) => {
    //   window.location.reload();
    // });

    axios.get('http://localhost:7000/api/procurement/item/findByName/' + item.company_id + '/' + item.name).then((res) => {
      console.log('res.dataaaaa');
      console.log(res.data);

      const payload = {
        itemType: {
          item_name: res.data.item_name,
          company_id: item.company_id,
          company_name: res.data.company_name,
          brand_name: res.data.brand_name,
          category_name: res.data.category_name,
          unitOfMeasure: res.data.unitOfMeasure,
          output_rule: res.data.output_rule,
          output_rule_unit: res.data.output_rule_unit,
          output_rule_type: res.data.output_rule_type,
          attributes_array: res.data.attributes_array,
          min_release_quantity: res.data.min_release_quantity,
        },
        transferQty: item.quantity,
        transferToEntity: item.required_by,
        transferFromEntity: item._id,
        // transferFromEntity: 'qwerty',
      };
      console.log(payload);

      // axios.post('http://localhost:4444/api/goods/transferGoods', payload).then((res) => {
      //   window.location.reload();
      // });
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
            {/* <TableCell component="th">Requested By</TableCell> */}
            <TableCell component="th">Requested Date</TableCell>
            <TableCell component="th">Requested Warehouse</TableCell>
            <TableCell component="th">Status</TableCell>
            <TableCell component="th">Confirmation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders)
            // .filter((order) => order.sentRequest)
            .map((order) => (
              <TableRow key={order.item_code}>
                <TableCell component="th" scope="row">
                  {order.item_code}
                </TableCell>
                <TableCell style={{}}>{order.name}</TableCell>
                <TableCell style={{}}>{order.brand}</TableCell>
                <TableCell style={{}}>{order.quantity}</TableCell>
                <TableCell style={{}}>{order.required_by}</TableCell>
                {/* <TableCell style={{}}>{order.requested_by}</TableCell> */}
                <TableCell style={{}}>{new Date().toISOString().split('T')[0]}</TableCell>
                <TableCell style={{}}>{order.warehouse_id}</TableCell>
                <TableCell style={{}}>{order.status}</TableCell>
                <Button variant="contained" sx={{ mt: 1 }} onClick={() => confirmDelivery(order)}>
                  confirm
                </Button>
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

export default WMOrderTable;
