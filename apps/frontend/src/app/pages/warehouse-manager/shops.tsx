import React from 'react';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import ShopCard from '../../components/shop-card/shop-card';

import Header from '../../components/header/header';
// import { shops } from '../../../data/shop';

export const shopss = [
  // shop 1
  {
    'Shop Info': {
      'Shop ID': 'S0001',
      Location: 'Maharagama',
      'Contact No': '0771425632',
      Address: 'No 9, Temple Road, Maharagama, 10280 ',
    },
    'Manager Info': {
      Name: 'Kasun Mendis',
      'Contact No': '0777573189',
      Email: 'kasun@gmail.com ',
    },
    'Assigned Warehouses': {
      W0001: 'Horana',
      W0003: 'Dehiwala',
    },
  },

  //   shop 2
  {
    'Shop Info': {
      'Shop ID': 'S0002',
      Location: 'Colombo',
      'Contact No': '0714362648',
      Address: 'No 3, Templers Road, Colombo 1, 00100',
    },
    'Manager Info': {
      Name: 'Devin Dissanayake',
      'Contact No': '0771454789',
      Email: 'devin@gmail.com ',
    },
    'Assigned Warehouses': {
      W0002: 'Colombo 3',
      W0003: 'Avissawella',
    },
  },
  //   shop 3
  {
    'Shop Info': {
      'Shop ID': 'S0003',
      Location: 'Maththegoda',
      'Contact No': '0771454789',
      Address: 'No 35, Araliya Uyana, Maththegoda, 10230',
    },
    'Manager Info': {
      Name: 'Isuru Nishadha',
      'Contact No': '0771454789',
      Email: 'isurunishadha99@gmail.com ',
    },
    'Assigned Warehouses': {
      W0001: 'Nugegoda',
      W0002: 'Kaduwela',
    },
  },
];

function shops() {
  return (
    <>
      <Header title={'Shops'} />

      <Box sx={{ width: '100%', paddingLeft: '2rem', marginTop: 5 }}>
        <Grid container rowGap={2} columnGap={2}>
          {shopss.map((shop) => (
            <Grid item>
              <ShopCard name={shop['Manager Info']['Name']} telephoneNumber={shop['Manager Info']['Contact No']} warehouse={shop['Shop Info']['Shop ID']} data={shop} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default shops;
