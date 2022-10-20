import { ChangeEvent, useState } from 'react';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import Header from '../../components/header/header';
import OrderTable from '../../components/order-table/order-table';
import PMOrderTable from '../../components/pmorder-table/pmorder-table';
// import { orders as data } from '../../../data/orders';
import axios from 'axios';
import React from 'react';

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

function orders() {
  const [value, setValue] = useState(0);
  const [orderData, setOrderData] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getRequestInfo = () => {
    axios.get('http://localhost:5000/api/shopWarehouseRequest/findAllDev').then((res) => {
      console.log(res.data);

      setOrderData(res.data);
    });
  };

  React.useEffect(() => {
    getRequestInfo();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleStatusChange = (e: ChangeEvent<{ value: unknown }>, item: string) => {
    console.log(e.target.value);
    console.log(item);
  };
  return (
    <>
      <Header title={'Orders'} />
      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              <Tab label="Received Requests" {...a11yProps(0)} />
              <Tab label="Sent Requests" {...a11yProps(1)} />
              <Tab label="History" {...a11yProps(2)} />
            </Tabs>
          </Box>
          {/* Received Requests */}
          <TabPanel value={value} index={0}>
            <OrderTable orders={orderData} handleStatusChange={handleStatusChange} />
          </TabPanel>

          {/* Sent Requests */}
          <TabPanel value={value} index={1}>
            <PMOrderTable orders={orderData} />
          </TabPanel>

          {/* History */}
          <TabPanel value={value} index={2}></TabPanel>
        </Box>
      </div>
    </>
  );
}

export default orders;
