import { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import { useTheme } from '@mui/material/styles';

import { Tabs, Tab, Typography, Box, Grid, Card, Table, TableRow, IconButton, TableContainer, TableHead, TableCell, TableBody, Button, TableFooter, TablePagination, Paper, Modal } from '@mui/material';
import { receivedQuotations, requestedQuotations, acceptedPO, placedPO } from '../../../data/PMProcurement';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import goodRequests from './goodRequests';
import axios from 'axios';

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
  let req_goods = [];
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const [requestGoods, setRequestGoods] = useState([]);
  const [quotationReqs, setQuotationReqs] = useState([]); // quotation array
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const extractQuotaions = (goodsRequests) => {
    console.log(goodsRequests);
    // goodsRequests.map((goodsRequest) => console.log(goodsRequest));
    return goodsRequests.filter((goodRequest) => goodRequest.status === 1);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/wh-prcurmnt-sup/findAllDev').then((res) => setRequestGoods(res.data));
    // const reorderGoods = localStorage.getItem('reorderRequests');

    // if (reorderGoods !== null) setRequestGoods(JSON.parse(reorderGoods));
    // console.log(requestGoods);

    //console.log(quotationReqs);
  }, []);

  useEffect(() => {
    req_goods = extractQuotaions(requestGoods);
  }, [requestGoods]);

  return (
    <>
      <Header title="Procurement" />
      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              <Tab label="Requested Quotations" {...a11yProps(0)} />
              {/* <Tab label="Received Quotations" {...a11yProps(1)} /> */}
              <Tab label="Placed Purchase Orders" {...a11yProps(2)} />
              <Tab label="Accepted Purchase Orders" {...a11yProps(3)} />
            </Tabs>
          </Box>
          {/* Requested Quotations*/}
          <TabPanel value={value} index={0}>
            <GeneralTable
              data={requestGoods.length !== 0 ? requestGoods.filter((requestGood: any) => requestGood?.status === 1 && requestGood?.proc_id === JSON.parse(localStorage.getItem('userData') || '')?.user_id) : []}
              displayFields={['_id', 'requiredQuantity', 'requiredDate']}
              requiredButton={true}
              noOfButtons={1}
              buttonDetails={[
                {
                  name: 'View',
                  color: 'primary',
                  action: (index) => {
                    handleOpenModal();
                    setSelectedIndex(index);
                    //console.log('white white white');
                  },
                },
              ]}
              headers={['Order ID', 'Required Quantity', 'Required By']}
            />
          </TabPanel>

          {/* Received Quotations*/}
          {/* <TabPanel value={value} index={1}>
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
          </TabPanel> */}

          {/* Placed Purchase Orders*/}
          {/* <TabPanel value={value} index={2}>
            <GeneralTable data={placedPO} headers={['Item code', 'Item', 'Brand', 'Required By', 'Qunatity', 'Unit Price', 'Supplier', 'Placed Date']} requiredButton={true} buttonDetails={[{ name: 'Cancel', color: 'error' }]} noOfButtons={1} />
          </TabPanel> */}

          {/* Accepted Purchase Orders*/}
          {/* <TabPanel value={value} index={3}>
            <GeneralTable data={acceptedPO} headers={['Item code', 'Item', 'Brand', 'Required By', 'Qunatity', 'Unit Price', 'Supplier', 'Placed Date', 'Accepted Date', 'Status']} />
          </TabPanel> */}
        </Box>
        <BasicModal goodRequest={requestGoods[4]} open={openModal} handleClose={handleCloseModal} />
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
  displayFields?: any[];
};

const GeneralTable = ({ data, headers, displayFields, requiredButton = false, noOfButtons = 0, buttonDetails = [{}] }: GeneralTableProps) => {
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
          {(rowsPerPage > 0 ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data).map((d, index) => (
            <TableRow key={d._id}>
              {/* {Object.keys(d).map((key) => (
                <TableCell key={key}>{d[key]}</TableCell>
              ))} */}
              {displayFields && displayFields.map((key) => <TableCell key={key}>{d[key]}</TableCell>)}
              {requiredButton &&
                buttonDetails.map((detail) => (
                  <TableCell component="th">
                    <Button variant="contained" color={detail.color} onClick={() => detail.action(index)}>
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({ goodRequest, open, handleClose }) {
  console.log(goodRequest);
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Order Summary
        </Typography>
        <Grid sx={{ display: 'flex', gap: '30px' }}>
          <Grid>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Item Name:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              {goodRequest?.item?.item_name}
            </Typography>
          </Grid>

          <Grid>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Brand:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              {goodRequest?.item?.brand_name}
            </Typography>
          </Grid>
          <Grid>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Required Quantity:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              {goodRequest?.requiredQuantity}
            </Typography>
          </Grid>
          <Grid>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Required Date:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              {goodRequest?.requiredDate}
            </Typography>
          </Grid>
        </Grid>
        <Typography sx={{ mt: 3 }} id="modal-modal-title" variant="h6" component="h2">
          Available Suppliers
        </Typography>
        <Grid>
          <Table stickyHeader sx={{ minWidth: 500, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell component="th">Supplier ID</TableCell>
                <TableCell component="th">Required Date</TableCell>

                <TableCell component="th">Suppliable Amount</TableCell>
                <TableCell component="th">Unit Price</TableCell>
                <TableCell component="th">Total</TableCell>
                <TableCell component="th">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {goodRequest?.suppliers &&
                goodRequest?.suppliers.map((supplier) => (
                  <TableRow>
                    <TableCell component="th">{supplier._id}</TableCell>
                    <TableCell component="th">{goodRequest.requiredDate}</TableCell>
                    {supplier?.status === 2 ? (
                      <>
                        <TableCell component="th">
                          {supplier.suppliableQuantity}/{goodRequest.requiredQuantity}
                        </TableCell>
                        <TableCell component="th">Rs. {supplier.price}</TableCell>
                        <TableCell component="th">Rs. {supplier.suppliableQuantity * supplier.price}</TableCell>
                        {supplier?.status === 3 ? (
                          <>
                            <TableCell component="th">
                              <Button variant="contained" color={'primary'}>
                                Place Order
                              </Button>
                            </TableCell>
                            <TableCell component="th">
                              <Button variant="contained" color={'primary'}>
                                Accept
                              </Button>
                            </TableCell>
                          </>
                        ) : (
                          <TableCell component="th">
                            <Button variant="contained" color={'primary'}>
                              Accept
                            </Button>
                          </TableCell>
                        )}
                      </>
                    ) : (
                      <>
                        <TableCell component="th">N/A</TableCell>
                        <TableCell component="th">N/A</TableCell>
                        <TableCell component="th">N/A</TableCell>
                        <TableCell component="th">N/A</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              {/* <TableRow>
                <TableCell component="th">6sddsd233434dsddfd</TableCell>
                <TableCell component="th">40/50</TableCell>
                <TableCell component="th">Rs. 300</TableCell>
                <TableCell component="th">Rs. 12000</TableCell>
                <TableCell component="th">
                  <Button variant="contained" color={'primary'}>
                    Accept
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">6sddsd233434dsddfd</TableCell>
                <TableCell component="th">40/50</TableCell>
                <TableCell component="th">Rs. 300</TableCell>
                <TableCell component="th">Rs. 12000</TableCell>
                <TableCell component="th">
                  <Button variant="contained" color={'primary'}>
                    Accept
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">6sddsd233434dsddfd</TableCell>
                <TableCell component="th">40/50</TableCell>
                <TableCell component="th">Rs. 300</TableCell>
                <TableCell component="th">Rs. 12000</TableCell>
                <TableCell component="th">
                  <Button variant="contained" color={'primary'}>
                    Accept
                  </Button>
                </TableCell>
              </TableRow> */}

              {/* <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={noOfAttr} />
                </TableRow> */}
            </TableBody>
            {/* <TableFooter>
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
            </TableFooter> */}
          </Table>
        </Grid>
      </Box>
    </Modal>
  );
}
