/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { items } from '../../../data/items';
import CustomTable from '../../components/custom-table/custom-table';
import Header from '../../components/header/header';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent, Skeleton } from '@mui/material';
import axios from 'axios';
import SMLowStocksTable from '../../components/smlow-stocks-table/smlow-stocks-table';

import SMAllItemsTable from '../../components/small-items-table/small-items-table';
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
  const [value, setValue] = React.useState(0);
  const [orderData, setOrderData] = React.useState<any>([]);
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

  const { id } = useParams(); //holds the category name
  const [allGoods, setAllGoods] = React.useState<any>([]); // items from inventory
  const [lowStocks, setLowStocks] = React.useState<any>([]); // items from inventory
  const [filteredAllGoods, setFilteredAllGoods] = React.useState<any>(null); // filtered items from inventory
  const [filteredLowStocks, setFilteredLowStocks] = React.useState<any>(null); // filtered items from inventory


  const companyID = JSON.parse(localStorage.getItem('userData') || '').company_id;
  // const companyID = JSON.parse(localStorage.getItem('userData') || '').company_id;
  const managing_id = JSON.parse(localStorage.getItem('userData') || '').managing_id; //owner_id
  // const managing_id = JSON.parse(localStorage.getItem('userData') || '').managing_id;
  // const companyID = 'acdf214124 ';
  // // const companyID = JSON.parse(localStorage.getItem('userData') || '').company_id;
  // const managing_id = 'qwerty';

  const getItemsFromAPI = () => {
    axios.get('http://localhost:7000/api/inventoryAPI/items/' + companyID + '/' + managing_id).then((res) => {
      console.log(res.data);
      setAllGoods([...res.data.allItems]);
      setLowStocks([...res.data.lowStockItems]);
    });
  };

  React.useEffect(() => {
    getItemsFromAPI();
  }, []);

  React.useEffect(() => {
    const filterAllGoods = allGoods.filter((item) => (item.category_name ? item.category_name.toLowerCase() === id?.toLowerCase() : false));
    setFilteredAllGoods(filterAllGoods);
  }, [allGoods, id]);

  React.useEffect(() => {
    const filterLowStocks = lowStocks.filter((item) => (item.category_name ? item.category_name.toLowerCase() === id?.toLowerCase() : false));
    setFilteredLowStocks(filterLowStocks);
  }, [lowStocks, id]);

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
            <SMLowStocksTable orders={lowStocks} handleStatusChange={() => handleStatusChange2(selected, selectedItem)} selected={selected} setSelected={setSelected} handleSelected={handleSelected} selectedItem={selectedItem} setSelectedItem={setSelectedItem} addSentRequest={addSentRequest} />
          </TabPanel>

          <TabPanel value={value} index={1}>

            {/* <CustomTable headerNames={['Name', 'Minimum Limit', 'Maximum Limit', 'Brand', 'Available Units', 'More Info', 'Reorder']} rows={filteredAllGoods} /> */}
            <SMAllItemsTable headerNames={['Name', 'Minimum Limit', 'Maximum Limit', 'Brand', 'Available Units', 'More Info', 'Reorder', 'Distribute']} rows={filteredAllGoods} />

          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default table;
// {/* <CustomTable headerNames={['Name', 'Minimum Limit', 'Maximum Limit', 'Brand', 'Available Units', 'More Info', 'Reorder']} /> */}
