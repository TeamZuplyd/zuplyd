import { useEffect, useState } from 'react';
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
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
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

export interface PMraisedIssueTableProps {
  orders: any[];
}

export function PMraisedIssueTable({ orders }: PMraisedIssueTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState(-1); //selected Warehouse
  const [selectedItem, setSelectedItem] = useState(0); //selected Item

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
  const [open, setOpen] = useState(false);
  const handleOpen = (id: number) => {
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
            <TableCell component="th">Title</TableCell>
            <TableCell component="th">Batch Number </TableCell>
            <TableCell component="th">Description</TableCell>
            <TableCell component="th">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : orders).map((i, index) => (
            <TableRow>
              <TableCell style={{}}>{i.title}</TableCell>
              <TableCell style={{}}>{i.batchNo}</TableCell>
              <TableCell style={{}}>{i.desc}</TableCell>
              <TableCell style={{}}>
                <Button variant="contained" onClick={() => handleOpen(index)}>
                  Resolve
                </Button>
                <BasicModal open={open} handleClose={handleClose} data={[orders[selectedItem].title, orders[selectedItem].batchNo, orders[selectedItem].desc]} />
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

export default PMraisedIssueTable;

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
  data: any[];
};

const createNewIssue = async (inputValues: any): Promise<any> => {};

function BasicModal({ open, handleClose, data }: BasicModalProps) {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      issue_title: '',
      batch_number: '',
      description: '',
      action: '',
    },
  });

  const inputValues = methods.watch();

  const useCreateIssue = () => {
    return useMutation(createNewIssue);
  };

  const { mutate: createIssue } = useCreateIssue();

  const handleCreateIssue = (inputValues: any) => {
    createIssue(inputValues);
  };

  // const [titleName, setTitleName] = useState('');
  // const [batchNumber, setBatchNumber] = useState('');
  // const [desc, setDesc] = useState('');

  // const discardBtnClick = () => {
  //   setTitleName('');
  //   setBatchNumber('');
  //   setDesc('');
  // };

  const [dropDown, setDropDown] = useState('');

  const handleChange = (event) => {
    setDropDown(event.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 700 }}>
          Issue Information
        </Typography>

        <Grid item xs>
          <div className="secondaryText" style={{ marginTop: '1rem' }}>
            Title
          </div>
          <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
            {data[0]}
          </div>
        </Grid>

        <Grid item xs>
          <div className="secondaryText" style={{ marginTop: '1rem' }}>
            Batch Number
          </div>
          <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
            {data[1]}
          </div>
        </Grid>

        <Grid item xs>
          <div className="secondaryText" style={{ marginTop: '1rem' }}>
            Description
          </div>
          <div className="primaryText" style={{ paddingTop: '0.5rem' }}>
            {data[2]}
          </div>
        </Grid>

        <FormProvider {...methods}>
          <Grid container xs={12} columnGap={4} sx={{ mb: 3 }}>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <TextField
                {...methods.register('description', { required: true })}
                // onChange={(e) => {
                //   setDesc(e.target.value);
                // }}
                id="outlined-basic"
                // value={desc}
                label="Description"
                variant="outlined"
                rows={5}
                multiline
                sx={{ mt: 3, width: '100%' }}
              />
            </Grid>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Action</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small"  label="action" {...methods.register('action', { required: true })}>
                <MenuItem value={'use'}>Use as is</MenuItem>
                <MenuItem value={'stop temporarily'}>Stop using temporarily</MenuItem>
                <MenuItem value={'discard'}>Stop using and discard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </FormProvider>

        <CardActions>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={() => {
              console.log(inputValues);
            }}
          >
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
