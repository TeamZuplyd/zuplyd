import { useState } from 'react';
import Header from '../../components/header/header';
import { useTheme } from '@mui/material/styles';

import { Tabs, Tab, Typography, Box, Grid, Card, Table, TableRow, IconButton, TableContainer, TableHead, TableCell, TableBody, Button, TableFooter, TablePagination, Paper } from '@mui/material';
import { receivedQuotations, requestedQuotations, acceptedPO, placedPO } from '../../../data/PMProcurement';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ py: 3, pr: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function procurement() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Header title="Procurement" />
      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              <Tab label="Requested Quotations" {...a11yProps(0)} />
              <Tab label="Received Quotations" {...a11yProps(1)} />
              <Tab label="Placed Purchase Orders" {...a11yProps(2)} />
              <Tab label="Accepted Purchase Orders" {...a11yProps(3)} />
            </Tabs>
          </Box>
          {/* Requested Quotations*/}
          <TabPanel value={value} index={0}>
            <GeneralTable data={requestedQuotations} headers={['Item code', 'Item', 'Required By']} />
          </TabPanel>

          {/* Received Quotations*/}
          <TabPanel value={value} index={1}>
            <GeneralTable
              data={receivedQuotations}
              headers={['Item code', 'Item', 'Brand', 'Required By', 'Qunatity', 'Unit Price', 'Supplier']}
              requiredButton={true}
              noOfButtons={2}
              buttonDetails={[
                { name: 'Place Order', color: 'primary' },
                { name: 'Discard', color: 'error' },
              ]}
            />
          </TabPanel>

          {/* Placed Purchase Orders*/}
          <TabPanel value={value} index={2}>
            <GeneralTable data={placedPO} headers={['Item code', 'Item', 'Brand', 'Required By', 'Qunatity', 'Unit Price', 'Supplier', 'Placed Date']} requiredButton={true} buttonDetails={[{ name: 'Cancel', color: 'error' }]} noOfButtons={1} />
          </TabPanel>

          {/* Accepted Purchase Orders*/}
          <TabPanel value={value} index={3}>
            <GeneralTable data={acceptedPO} headers={['Item code', 'Item', 'Brand', 'Required By', 'Qunatity', 'Unit Price', 'Supplier', 'Placed Date', 'Accepted Date', 'Status']} />
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

export default procurement;

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

type GeneralTableProps = {
  data: any[];
  headers: string[];
  requiredButton?: boolean;
  noOfButtons?: number;
  buttonDetails?: any[];
};

const GeneralTable = ({ data, headers, requiredButton = false, noOfButtons = 0, buttonDetails = [{}] }: GeneralTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const noOfAttr = requiredButton ? headers.length + noOfButtons : headers.length;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - noOfAttr) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header} component="th">
                {header}
              </TableCell>
            ))}
            {requiredButton && buttonDetails.map((detail) => <TableCell component="th"></TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((d) => (
            <TableRow key={d.item_code}>
              {Object.keys(d).map((key) => (
                <TableCell key={key}>{d[key]}</TableCell>
              ))}
              {requiredButton &&
                buttonDetails.map((detail) => (
                  <TableCell component="th">
                    <Button variant="contained" color={detail.color}>
                      {detail.name}
                    </Button>
                  </TableCell>
                ))}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={noOfAttr} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={noOfAttr}
              count={data.length}
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
};
