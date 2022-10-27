/* eslint-disable-next-line */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Table, TableBody, TableCell, TextField, TableContainer, TableFooter, TablePagination, TableRow, Paper, IconButton, TableHead, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent, Skeleton, CardActions, styled, Divider, CardActionArea } from '@mui/material';
import { FirstPage as FirstPageIcon, KeyboardArrowLeft, KeyboardArrowRight, LastPage as LastPageIcon } from '@mui/icons-material';
import ItemSideOver from '../item-side-over/item-side-over';
import { useForm, FormProvider } from 'react-hook-form';
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

export interface SMAllItemsTableProps {
  headerNames: string[];
  rows: any;
}

export function SMAllItemsTable({ headerNames, rows }: SMAllItemsTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //side over
  const [rightSideNav, setrightSideNav] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setrightSideNav(!rightSideNav);
  };

  //setting the state to hold the clicked row
  const [selectedRow, setSelectedRow] = React.useState({});

  React.useEffect(() => {
    console.log(rows);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ItemSideOver toggle={rightSideNav} toggleDrawer={toggleDrawer} data={selectedRow} />
      <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', alignContent: 'center' }}>
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {headerNames.map((headerName) => (
                <TableCell key={headerName}>{headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row: any, j: number) => (
              <TableRow key={j} onClick={() => setSelectedRow(row)}>
                <TableCell scope="row">{row.item_name}</TableCell>

                <TableCell>{row.min ? row.min : '-'}</TableCell>
                <TableCell>{row.max ? row.max : '-'}</TableCell>
                <TableCell>{row.brand_name}</TableCell>
                <TableCell>{row.totalStock}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={toggleDrawer(true)}>
                    More Info
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="success">
                    Reorder
                  </Button>
                </TableCell>

                <TableCell>
                  <Button variant="contained" onClick={toggleDrawer(true)}>
                    Release
                  </Button>

                  <BasicModal order={row} open={open} handleClose={handleClose} />
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
                colSpan={7}
                count={rows.length}
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
    </>
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
  // handleSelect: (id: number) => void;
  // selected: number;
  // handleStatusChange: (warehouseID: number, selectedItem: string) => void;
  // selectedItem: string;
  order: any;
  // addSentRequest: (obj: any) => void;
  // setSelectedItem: (item: string) => void;
};

function BasicModal({ order, open, handleClose }: BasicModalProps) {
  // const [open, setOpen] = React.useState(false);
  const [textValue, setTextValue] = React.useState(0);

  const handleRequest = () => {
    const payload = {
      itemType: {
        item_name: order.item_name,
        company_id: order.company_id,
        company_name: order.company_name,
        unitOfMeasure: order.min_release_quantity_unit,
        output_rule: order.output_rule,
        output_rule_unit: order.output_rule_unit,
        output_rule_type: order.output_rule_type,
        attributes_array: order.attributes_array,
        suppliers: order.suppliers,
      },
      releaseQty: textValue,
      releaseFromEntity: JSON.parse(localStorage.getItem('userData') || '').managing_id,
    };
    axios.post('http://localhost:4444/api/goods/releaseGoods', payload).then((res) => {
      console.log(res.data);
    });
  };

  // const handleClose = () => {
  //   setOpen(true);
  // };

  const handleSubmit = () => {
    // console.log(orderArray);
    // addSentRequest(orderArray);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 700 }}>
          Release Items
        </Typography>
        <Typography id="modal-modal-title" variant="h6" sx={{ pt: 2 }}>
          Item Info
        </Typography>
        <Grid container spacing={2} direction="row" paddingTop={2}>
          <Grid container item xs={6}>
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

          <Grid container item xs={6}>
            <Grid item xs sx={{ mb: 3 }}>
              <div className="secondaryText">Releasing Quantity</div>
              <TextField id="outlined-basic" size="small" type="number" InputProps={{ inputProps: { min: 1 } }} variant="outlined" sx={{ pt: 1 }} value={textValue} onChange={(e) => setTextValue(parseInt(e.target.value))} />
            </Grid>
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
export default SMAllItemsTable;
