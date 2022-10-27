import { useEffect, useState } from 'react';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import Header from '../../components/header/header';
import PMOrderTable from '../../components/pmorder-table/pmorder-table';
import SMOrderTable from '../../components/smorder-table/smorder-table';
import { orders as data } from '../../../data/orders';
import WMOrderTable from '../../components/wmorder-table/wmorder-table';
import SMorderHistoryTable from '../../components/smorder-history-table/smorder-history-table';
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

function orders() {
  const [value, setValue] = useState(0);
  const [orderData, setOrderData] = useState(data);
  const [sentRequest, setSentRequest] = useState<any>([]);
  const [itemData, setItemData] = useState<any>([]);
  const [completeData, setCompleteData] = useState<any>([]);
  const [sentData, setSentData] = useState<any>([]);

  const addSentRequest = (request: any) => {
    console.log(request);
    setSentRequest([...sentRequest, ...request]);
    //SentRequest -> backend object
  };

  const handleStatusChange = (warehouseIndex: number, selectedItem: string) => {
    setSelected(-1);
    const index = orderData.findIndex((item) => item.item_code === selectedItem); //selected request
    const newOrderData = orderData[index]; //backend data object
    // newOrderData['warehouse_id'] = warehouses[warehouseIndex];
    newOrderData['sentRequest'] = true;
    setOrderData([...orderData.slice(0, index), newOrderData, ...orderData.slice(index + 1)]);
    console.log(orderData);
  };

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const warehouses = ['W0001', 'W0002', 'W0003'];

  const [selected, setSelected] = useState(-1); //selected Warehouse
  const [selectedItem, setSelectedItem] = useState(''); //selected Item

  const handleSelected = (index: number) => {
    setSelected(index);
    console.log('selected ' + index);
  };

  const getRequestInfo = () => {
    const shopID = JSON.parse(localStorage.getItem('userData') || '').managing_id;
    // const shopID = 'S0002';

    axios.get('http://localhost:5000/api/shopWarehouseRequest/findAllByShopID/' + shopID).then((res) => {
      setItemData(res.data);
      console.log(res.data);

      let allItems = res.data;
      let itemsComplete: any = [];
      let restItems: any = [];

      for (let index = 0; index < allItems.length; index++) {
        if (allItems[index].status == 'complete' || allItems[index].status == 'Complete') {
          itemsComplete.push(allItems[index]);
        } else {
          restItems.push(allItems[index]);
        }
      }
      setCompleteData(itemsComplete);
      setSentData(restItems);

      console.log(completeData);
      console.log(sentData);
    });
  };

  useEffect(() => {
    getRequestInfo();
  }, []);

  useEffect(() => {
    console.log('itemsPending');
    console.log(completeData);
  }, [completeData]);

  useEffect(() => {
    console.log('restItems');

    console.log(sentData);
  }, [sentData]);

  return (
    <>
      <Header title={'Orders'} />
      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              {/* <Tab label="Low Stocks" {...a11yProps(0)} /> */}
              <Tab label="Sent Requests" {...a11yProps(1)} />
              <Tab label="History" {...a11yProps(2)} />
            </Tabs>
          </Box>

          {/* Low Stocks */}
          {/* <TabPanel value={value} index={0}>
            <SMOrderTable orders={orderData} handleStatusChange={() => handleStatusChange(selected, selectedItem)} selected={selected} setSelected={setSelected} warehouses={warehouses} handleSelected={handleSelected} selectedItem={selectedItem} setSelectedItem={setSelectedItem} addSentRequest={addSentRequest} />
          </TabPanel> */}

          {/* Sent Requests */}
          <TabPanel value={value} index={0}>
            <WMOrderTable orders={sentData} />
          </TabPanel>

          {/* History */}
          <TabPanel value={value} index={1}>
            <SMorderHistoryTable orders={completeData} />
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

export default orders;
