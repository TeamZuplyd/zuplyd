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
import { Button, TableHead, Modal, Typography, Card, CardContent, CardActions, Grid, styled, Divider, TextField, CardActionArea } from '@mui/material';

import { AutofpsSelectRounded, HdrOnSelectRounded, Warehouse } from '@mui/icons-material';

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
export interface SMLowStocksTableProps {
  orders: any[];
  handleStatusChange: () => void;
  setSelected: (id: number) => void;
  selected: number;
  handleSelected: (id: number) => void;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  addSentRequest: (obj: any) => void;
}

export function SMLowStocksTable({ orders, handleStatusChange, setSelected, selected, handleSelected, selectedItem, setSelectedItem, addSentRequest }: SMLowStocksTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentItem, setCurrentItem] = React.useState('');


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

    console.log(id);
    setOpen(true);
    setCurrentItem(id);
  };

  const handleClose = () => {
    setOpen(false);
    setSelected(-1);
    setCurrentItem('');

  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell component="th">Name </TableCell>
            <TableCell component="th">Brand</TableCell>
            <TableCell component="th">Available Quantity</TableCell>
            <TableCell component="th">Minimum Limit</TableCell>
            <TableCell component="th">Maximum Limit</TableCell>
            <TableCell component="th">Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders).map((order) => (

            <TableRow key={order.item_code}>
              <TableCell style={{}}>{order.item_name}</TableCell>
              <TableCell style={{}}>{order.brand_name}</TableCell>
              <TableCell style={{}}>{order.totalStock}</TableCell>
              <TableCell style={{}}>{order.min}</TableCell>
              <TableCell style={{}}>{order.max}</TableCell>
              <TableCell style={{}}>
                {/* <Button variant="contained" onClick={handleStatusChange}> */}

                <Button variant="contained" onClick={() => handleOpen(order._id)}>
                  Request
                </Button>
                <BasicModal open={open} handleClose={handleClose} handleSelect={handleSelected} selected={selected} handleStatusChange={handleStatusChange} selectedItem={selectedItem} order={order} addSentRequest={addSentRequest} currentItem={currentItem} />

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
  handleSelect: (id: number) => void;
  selected: number;
  handleStatusChange: (warehouseID: number, selectedItem: string) => void;
  selectedItem: string;
  order: any;
  addSentRequest: (obj: any) => void;

  currentItem: string;
  // setSelectedItem: (item: string) => void;
};

function BasicModal({ open, handleClose, handleSelect, selected, handleStatusChange, selectedItem, order, addSentRequest, currentItem }: BasicModalProps) {

  const [warehouseOne, setWarehouseOne] = React.useState(0);
  const [warehouseTwo, setWarehouseTwo] = React.useState(0);
  const [requiredDate, setRequiredDate] = React.useState('');

  const [warehouses, setWarehouses] = React.useState<any>([]);
  const [totalStock, setTotalStock] = React.useState<any>({});
  const [inputs, setInputs] = React.useState<any>([]);
  const [isFetched, setIsFetched] = React.useState(false);
  // const managing_id = '464456';
  // const company_id = '6358d81729f842203326dd5f';
  const managing_id = JSON.parse(localStorage.getItem('userData') || '').managing_id;
  const company_id = JSON.parse(localStorage.getItem('userData') || '').company_id;
  const body = warehouses.map((warehouse: any, index: any) => ({
    brand: order.brand_name,
    requested_by: 'S002',
    name: order.item_name,
    warehouse_id: warehouse.warehouse_id,
    request: true,
    required_date: requiredDate,
    status: 'pending',
    company_id: company_id,
    quantity: inputs[index],
    sentRequest: true,
    requested_date: new Date().toISOString().slice(0, 10),
    item_code: order._id,
  }));
  const handleRequest = async () => {
    const res = await axios.post('http://localhost:5000/api/shopWarehouseRequest/createMultipleRequests', body);
    console.log(res)
    console.log('request');
  };

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:4321/api/shops/findByManager/${managing_id}`);
    const warehouses = res.data.shop.flatMap((shop: any) => shop.assigned_warehouses.map((warehouse: any) => warehouse));
    setWarehouses([...warehouses]);
    setInputs(new Array(warehouses.length).fill(0));
    const getManagerIds = await warehouses.map(async (warehouse) => {
      const res = await axios.get(`http://localhost:1234/api/warehouses/findById/${warehouse.warehouse_id}`);
      return res.data.warehouse.manager_id;
    });
    const managerIds = await Promise.all(getManagerIds);

    const res_ = await axios.get('http://localhost:7000/api/procurement/item/find/' + order._id); //item strcuture

    const itemStructure = res_.data.item;

    const results = await managerIds.map(async (managing_id) => {
      let temp = itemStructure;
      const tempID = itemStructure._id;
      delete temp['__v'];
      delete temp['_id'];
      const body = {
        itemType: itemStructure,
        ownerId: managing_id,
      };

      try {
        const res2 = await axios.post('http://localhost:4444/api/goods/getItemStock', body);
        return res2.data.totalStock;
      } catch (err) {
        console.log(err);
      }
    });

    const final_result = await Promise.all(results);
    setTotalStock([...final_result]);
  };

  React.useEffect(() => {
    if (!isFetched) {
      setIsFetched(true);
      fetchData();
    }
  }, [isFetched]);

  console.log(order);
  console.log(
    warehouses.map((warehouse: any, index: any) => ({
      brand: order.brand_name,
      requested_by: 'S001',
      name: order.item_name,
      warehouse_id: warehouse.warehouse_id,
      request: true,
      required_date: requiredDate,
      status: 'pending',
      company_id: company_id,
      quantity: inputs[index],
      sentRequest: true,
      requested_date: new Date().toISOString().slice(0, 10),
      item_code: order._id,
    }))
  );
  return (
    <Modal open={currentItem === order._id} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

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
                {order.item_name}
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Category</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                {order.category_name}
              </div>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={2}>
              <div className="secondaryText">Brand</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                {order.brand_name}
              </div>
            </Grid>
            <Grid item xs>
              <div className="secondaryText">Measuring Unit</div>
              <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
                {order.output_rule_unit}
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography id="modal-modal-title" variant="h6" sx={{ pt: 1 }}>
          Order Information
        </Typography>

        <TableContainer>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Warehouse</TableCell>
                <TableCell>Available amount</TableCell>
                <TableCell>Order</TableCell>
              </TableRow>
            </TableHead>
            {warehouses.map((warehouse, index) => (
              <TableRow>
                <TableCell>{warehouse.warehouse_name}</TableCell>
                <TableCell>{totalStock[index]}</TableCell>
                <TableCell>
                  <TextField
                    key={index}
                    size="small"
                    id="outlined-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: { min: 0, max: totalStock[index] },
                    }}
                    variant="outlined"
                    value={inputs[index]}
                    onChange={(e) => {
                      setInputs(inputs.map((input: any, i: any) => (i === index ? parseInt(e.target.value) : input)));
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>


        <Grid container item>
          <Grid item xs={2} sx={{ mt: 0.5, mb: 0.5 }}>
            <span className="secondaryText">Required Date</span>
          </Grid>
          <Grid item xs={6}>
            <input type="date" style={{ marginLeft: 2 }} value={requiredDate} onChange={(e) => setRequiredDate(e.target.value)} />
          </Grid>

          <Grid item xs>
            <div className="secondaryText">Requesting Quantity</div>

            <TextField id="outlined-basic" size="small" type="number" value={inputs.reduce((partialSum, acc) => partialSum + acc, 0)} disabled={true} />

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

export default SMLowStocksTable;
