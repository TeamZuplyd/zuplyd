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
import { Button, TableHead, Modal, Typography, Card, CardContent, CardActions, Grid, styled, Divider, TextField, CardActionArea } from '@mui/material';

import { AutofpsSelectRounded, HdrOnSelectRounded, Warehouse } from '@mui/icons-material';
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

interface SMOrderTableProps {
  orders: any[];
  handleStatusChange: () => void;
  setSelected: (id: number) => void;
  selected: number;
  warehouses: string[];
  handleSelected: (id: number) => void;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  addSentRequest: (obj: any) => void;
}

export function SMOrderTable({ orders, handleStatusChange, setSelected, selected, warehouses, handleSelected, selectedItem, setSelectedItem, addSentRequest }: SMOrderTableProps) {
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

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id: string) => {
    setOpen(true);
    setSelectedItem(id);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(-1);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Item Code</TableCell>
            <TableCell component="th">Name </TableCell>
            <TableCell component="th">Brand</TableCell>
            <TableCell component="th">Available Quantity</TableCell>
            {/* <TableCell component="th">Status</TableCell> */}
            {/* <TableCell component="th">Required By</TableCell> */}
            {/* <TableCell component="th">Requested By</TableCell> */}
            {/* <TableCell component="th">Requested Date</TableCell> */}
            <TableCell component="th">Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders)
            .filter((order) => !order.sentRequest && order.request)
            .map((order) => (
              <TableRow key={order.item_code}>
                <TableCell component="th" scope="row">
                  {order.item_code}
                </TableCell>
                <TableCell style={{}}>{order.name}</TableCell>
                <TableCell style={{}}>{order.brand}</TableCell>
                <TableCell style={{}}>{order.quantity}</TableCell>
                {/* <TableCell style={{}}>{order.status}</TableCell> */}
                {/* <TableCell style={{}}>{order.required_by}</TableCell> */}
                {/* <TableCell style={{}}>{order.requested_by}</TableCell> */}
                {/* <TableCell style={{}}>{order.requested_date}</TableCell> */}
                <TableCell style={{}}>
                  {/* <Button variant="contained" onClick={handleStatusChange}> */}
                  <Button variant="contained" onClick={() => handleOpen(order.item_code)}>
                    Request
                  </Button>
                  <BasicModal open={open} handleClose={handleClose} data={warehouses} handleSelect={handleSelected} selected={selected} handleStatusChange={handleStatusChange} selectedItem={selectedItem} order={order} addSentRequest={addSentRequest} />
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

export default SMOrderTable;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1064,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

type BasicModalProps = {
  open: boolean;
  handleClose: () => void;
  data: string[];
  handleSelect: (id: number) => void;
  selected: number;
  handleStatusChange: (warehouseID: number, selectedItem: string) => void;
  selectedItem: string;
  order: any;
  addSentRequest: (obj: any) => void;
  // setSelectedItem: (item: string) => void;
};

function BasicModal({ open, handleClose, data, handleSelect, selected, handleStatusChange, selectedItem, order, addSentRequest }: BasicModalProps) {
  const [warehouseOne, setWarehouseOne] = React.useState(0);
  const [warehouseTwo, setWarehouseTwo] = React.useState(0);
  const [requiredDate, setRequiredDate] = React.useState('');

  const handleRequest = () => {
    handleStatusChange(0, selectedItem);
    handleSubmit();
    console.log('click req');
  };

  const handleSubmit = () => {
    const warehouseOneID = 'W0001';
    const warehouseTwoID = 'W0002';
    const orderArray: any = [];
    console.log(order);

    if (warehouseOne > 0) {
      const orderOne = Object.assign({}, order);
      orderOne.warehouse_id = warehouseOneID;
      orderOne.quantity = warehouseOne;
      orderOne.required_by = requiredDate;
      console.log(orderOne);
      orderArray.push(orderOne);
    }
    if (warehouseTwo > 0) {
      const orderTwo = Object.assign({}, order);
      orderTwo.warehouse_id = warehouseTwoID;
      orderTwo.quantity = warehouseTwo;
      orderTwo.required_by = requiredDate;
      orderArray.push(orderTwo);
    }
    console.log(orderArray);
    addSentRequest(orderArray);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 700 }}>
          Resupply Request
        </Typography>
        <Typography id="modal-modal-title" variant="h6" sx={{ pt: 2 }}>
          Item Info
        </Typography>
        <Grid container spacing={2} direction="row" paddingTop={2}>
          <Grid container item>
            <Grid item xs={2}>
              <div className="secondaryText">Name</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                Shampoo
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Category</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                Personal Care
              </div>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={2}>
              <div className="secondaryText">Brand</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                Loreal
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Measuring Unit</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                Bottles
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography id="modal-modal-title" variant="h6" sx={{ pt: 1 }}>
          Stocks Available Warehouses
        </Typography>
        <Grid container spacing={2} direction="row" paddingTop={2}>
          <Grid container item>
            <Grid item xs>
              <div className="secondaryText">W0001</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                Kottawa
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Batch No</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                BM12354
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Expiry Date</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                2024/02/16
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Available Quantity</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                200
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Requesting Quantity</div>
              <TextField id="outlined-basic" size="small" type="number" InputProps={{ inputProps: { min: 1 } }} variant="outlined" sx={{ pt: 1 }} value={warehouseOne} onChange={(e) => setWarehouseOne(parseInt(e.target.value))} />
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Grid container spacing={2} direction="row" paddingTop={2}>
          <Grid container item>
            <Grid item xs>
              <div className="secondaryText">W0002</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                Mattegoda
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Batch No</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                BM78945
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Expiry Date</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                2024/03/20
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Available Quantity</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                100
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Requesting Quantity</div>
              <TextField id="outlined-basic" size="small" type="number" InputProps={{ inputProps: { min: 1 } }} variant="outlined" sx={{ pt: 1 }} value={warehouseTwo} onChange={(e) => setWarehouseTwo(parseInt(e.target.value))} />
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Grid container item>
          <Grid item xs={2} sx={{ mt: 0.5, mb: 0.5 }}>
            <span className="secondaryText">Required Date</span>
          </Grid>
          <Grid item xs={6}>
            <input type="date" style={{ marginLeft: 2 }} value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} />
          </Grid>
          <Grid item>
            <div className="secondaryText">Total Quantity</div>
            <TextField id="outlined-basic" size="small" type="number" sx={{ pt: 1, width: 166.66 }} disabled value={warehouseOne + warehouseTwo} />
          </Grid>
        </Grid>
        <CardActions>
          <Button variant="contained" color="success" sx={{ mr: 2 }} onClick={handleRequest}>
            Send Request
          </Button>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Cancel
          </Button>
        </CardActions>
      </Box>
    </Modal>
  );
}
