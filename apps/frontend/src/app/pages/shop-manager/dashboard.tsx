import { Grid } from '@mui/material';
import React from 'react';
import DashboardCard from '../../components/dashboard-card/dashboard-card';
import DashboardCardNew from '../../components/dashboard-card-new/dashboard-card-new';
import Header from '../../components/header/header';
import axios from 'axios';

const dashboardCards = [
  { title: 'Shop managers', value: 2, top: 5, imgPath: '../../assets/svg/users-gray.svg' },
  { title: 'No of responses', value: 13, top: 5, imgPath: '../../assets/svg/shop-gray.svg' },
  { title: 'No of items', value: 5, top: 5, imgPath: '../../assets/svg/warehouse-gray.svg' },
];

function dashboard() {
  return (
    <>
      <Header title={'Dashboard'} />
      <div style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', alignContent: 'space-between' }}>
        {dashboardCards.map((item: any) => {
          return (
            <Grid item xs={3} sx={{ mt: 0 }}>
              <DashboardCardNew title={item.title} value={item.value} top={item.top} imgPath={item.imgPath} />
            </Grid>
          );
        })}
      </div>
    </>
  );
}

export default dashboard;
