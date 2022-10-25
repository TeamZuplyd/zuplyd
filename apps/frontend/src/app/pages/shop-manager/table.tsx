/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { items } from '../../../data/items';
import CustomTable from '../../components/custom-table/custom-table';
import Header from '../../components/header/header';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent, Skeleton } from '@mui/material';
import WMlowStocksTable from '../../components/wmlow-stocks-table/wmlow-stocks-table';
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

const table = () => {
  // const [itemInfo, setItemInfo] = useState<any>([]);
  const [value, setValue] = React.useState(0);
  const [orderData, setOrderData] = React.useState<any>([]);
  // const [open, setOpen] = useState(false);
  const [selected, setSelected] = React.useState(-1); //selected Warehouse
  const [selectedItem, setSelectedItem] = React.useState(''); //selected Item
  const [sentRequest, setSentRequest] = React.useState<any>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleStatusChange2 = (warehouseIndex: number, selectedItem: string) => {
    setSelected(-1);
    const index = orderData.findIndex((item) => item.item_code === selectedItem); //selected request
    const newOrderData = orderData[index]; //backend data object
    // newOrderData['warehouse_id'] = warehouses[warehouseIndex];
    newOrderData['sentRequest'] = true;
    setOrderData([...orderData.slice(0, index), newOrderData, ...orderData.slice(index + 1)]);
    console.log(orderData);
  };

  const handleSelected = (index: number) => {
    setSelected(index);
    console.log('selected ' + index);
  };

  const addSentRequest = (request: any) => {
    console.log(request);
    setSentRequest([...sentRequest, ...request]);
    //SentRequest -> backend object
  };

  // const getRequestInfo = () => {
  //   axios.get('http://localhost:5000/api/shopWarehouseRequest/findAllDev').then((res) => {
  //     console.log(res.data);

  //     setOrderData(res.data);
  //   });
  // };

  // useEffect(() => {
  //   getRequestInfo();
  // }, []);

  // const getItemInfo = () => {
  //   axios.get('http://localhost:7000/api/procurement/item/findAll').then((res) => {
  //     setItemInfo(res.data.items);
  //     console.log(res.data.items);
  //   });
  // };

  // React.useEffect(() => {
  //   getItemInfo();
  // }, []);

  const { id } = useParams(); //holds the category name
  const [itemStructure, setItemStructure] = React.useState<any>(null);
  // const [items, setItems] = React.useState<any>(null);
  //get data from the backend relating to the category name
  //get item structure from procurement

  const companyID = 'acdf214124 ';
  const getItemStructure = () => {
    axios.get('http://localhost:7000/api/procurement/item/findAll/'+ companyID).then((res) => {
      setItemStructure(res.data.items);
      console.log(res.data.items);
      console.log(itemStructure);
    });
  };

  // const getItems = () => {
  //   axios.get('http://localhost:5000/api/shopWarehouseRequest/findAllDev').then((res) => {
  //     setItems(res.data);
  //     console.log(res.data);
  //     console.log(items);
  //   });

  React.useEffect(() => {
    getItemStructure();
  }, []);

  React.useEffect(() => {
    console.log(itemStructure);
  }, [itemStructure]);

  //get the item details from inventory

  // if (itemStructure === null) {
  //   return <Skeleton />
  // }
  const data = items.filter((item) => id !== undefined && item.category.toLowerCase() === id.toLowerCase()); //mock data
  return (
    <>
      <Header title="Inventory" />
      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              <Tab label="Low Stocks" {...a11yProps(0)} />
              <Tab label="All Items" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <WMlowStocksTable orders={orderData} handleStatusChange={() => handleStatusChange2(selected, selectedItem)} selected={selected} setSelected={setSelected} handleSelected={handleSelected} selectedItem={selectedItem} setSelectedItem={setSelectedItem} addSentRequest={addSentRequest} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <CustomTable headerNames={['Name', 'Minimum Limit', 'Maximum Limit', 'Brand', 'Available Units', 'More Info', 'Reorder']} rows={data} />
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default table;
// {/* <CustomTable headerNames={['Name', 'Minimum Limit', 'Maximum Limit', 'Brand', 'Available Units', 'More Info', 'Reorder']} /> */}
