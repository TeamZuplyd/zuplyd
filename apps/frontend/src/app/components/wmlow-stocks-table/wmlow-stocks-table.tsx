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
import { Button, TableHead, Modal, Typography, Card, CardContent, CardActions, Grid, styled, Divider, TextField, CardActionArea, MenuItem } from '@mui/material';

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

interface WMlowStocksTableProps {
  orders: any[];
  handleStatusChange: () => void;
  setSelected: (id: number) => void;
  selected: number;
  handleSelected: (id: number) => void;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  addSentRequest: (obj: any) => void;
}

export function WMlowStocksTable({ orders, handleStatusChange, setSelected, selected, handleSelected, selectedItem, setSelectedItem, addSentRequest }: WMlowStocksTableProps) {
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
            .map((order) => {
              console.log(order);
              return (
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
                    <BasicModal open={open} handleClose={handleClose} data={[order.name, order.brand]} handleSelect={handleSelected} selected={selected} handleStatusChange={handleStatusChange} selectedItem={selectedItem} order={order} addSentRequest={addSentRequest} />
                  </TableCell>
                </TableRow>
              );
            })}
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

export default WMlowStocksTable;

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

const prioritySet = [
  {
    label: 'Low',
    value: 'low',
  },
  {
    label: 'Moderate',
    value: 'moderate',
  },
  {
    label: 'High',
    value: 'high',
  },
];

function BasicModal({ open, handleClose, data, handleSelect, selected, handleStatusChange, selectedItem, order, addSentRequest }: BasicModalProps) {
  // const [warehouseOne, setWarehouseOne] = React.useState(0);
  // const [warehouseTwo, setWarehouseTwo] = React.useState(0);
  const [requiredDate, setRequiredDate] = React.useState('');
  const [requiredQuantity, setRequiredQuantity] = React.useState(0);
  const [priority, setPriority] = React.useState('low');
  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  // const handleRequest = () => {
  //   handleStatusChange(0, selectedItem);
  //   handleSubmit();
  //   console.log('click req');
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderRequest = [
      {
        ...order,
        requiredQuantity: requiredQuantity,
        requiredDate: requiredDate,
        priority: priority,
        assigned: false,
        status: 0,
        suppliers: [
          {
            _id: '3434efee34234',
            name: 'Sanka',
            status: 1,
          },
          {
            _id: '3435efee34234',
            name: 'Decim',
            status: 1,
          },
          {
            _id: '3436efee34234',
            name: 'Kashum',
            status: 1,
          },
        ],
      },
      {
        ...order,
        requiredQuantity: requiredQuantity,
        requiredDate: requiredDate,
        priority: priority,
        assigned: false,
        status: 0,
        suppliers: [
          {
            _id: '3434efee34234',
            name: 'Sanka',
            status: 1,
          },
          {
            _id: '3435efee34234',
            name: 'Decim',
            status: 1,
          },
          {
            _id: '3436efee34234',
            name: 'Kashum',
            status: 1,
          },
        ],
      },
      {
        ...order,
        requiredQuantity: requiredQuantity,
        requiredDate: requiredDate,
        priority: 'high',
        assigned: false,
        status: 0,
        suppliers: [
          {
            _id: '3434efee34234',
            name: 'Sanka',
            status: 1,
          },
          {
            _id: '3435efee34234',
            name: 'Decim',
            status: 1,
          },
          {
            _id: '3436efee34234',
            name: 'Kashum',
            status: 1,
          },
        ],
      },
      {
        ...order,
        requiredQuantity: requiredQuantity,
        requiredDate: requiredDate,
        priority: 'moderate',
        assigned: false,
        status: 0,
        suppliers: [
          {
            _id: '3434efee34234',
            name: 'Sanka',
            status: 1,
          },
          {
            _id: '3435efee34234',
            name: 'Decim',
            status: 1,
          },
          {
            _id: '3436efee34234',
            name: 'Kashum',
            status: 1,
          },
        ],
      },
    ];
    console.log(orderRequest);

    localStorage.setItem('reorderRequests', JSON.stringify(orderRequest));
    // console.log(orderArray);
    // addSentRequest(orderArray);
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
                {data[0]}
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
                {data[1]}
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
          Order Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container item sx={{ display: 'flex', gap: '20px', mt: 1, mb: 1 }}>
            <Grid>
              <Grid item sx={{ mb: 0.5 }}>
                <span className="secondaryText">Required Date</span>
              </Grid>
              <Grid item>
                <input type="date" style={{ marginLeft: 2 }} value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} />
              </Grid>
            </Grid>

            <Grid item>
              <div className="secondaryText">Requesting Quantity</div>
              <TextField id="outlined-basic" size="small" type="number" InputProps={{ inputProps: { min: 1 } }} variant="outlined" sx={{ pt: 1 }} value={requiredQuantity} onChange={(e) => setRequiredQuantity(parseInt(e.target.value))} />
            </Grid>
            <Grid>
              <Grid item sx={{ mt: 0.5, mb: 0.5 }}>
                <span className="secondaryText">Please select your priority</span>
              </Grid>
              <TextField fullWidth size="small" id="outlined-select-currency" value={'low'} select onChange={handleChange}>
                {prioritySet.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <CardActions>
            <Button variant="contained" color="success" sx={{ mr: 2 }} type="submit">
              Send Request
            </Button>
            <Button variant="contained" color="warning" onClick={handleClose}>
              Cancel
            </Button>
          </CardActions>
        </form>
      </Box>
    </Modal>
  );
}
