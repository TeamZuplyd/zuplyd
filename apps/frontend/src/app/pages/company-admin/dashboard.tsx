import { Grid } from '@mui/material';
import React from 'react';
import DashboardCard from '../../components/dashboard-card/dashboard-card';
import DashboardCardNew from '../../components/dashboard-card-new/dashboard-card-new';
import Header from '../../components/header/header';
import { useAuth0, User } from '@auth0/auth0-react';
import axios from 'axios';
import { setLoggedInUserData } from '../../utils';

const dashboardCards = [
  { title: 'Procurement Managers', value: 5, top: 5, imgPath: '../../assets/svg/users-gray.svg' },
  { title: 'No of Shops', value: 45, top: 5, imgPath: '../../assets/svg/shop-gray.svg' },
  { title: 'No of Warehouses', value: 5, top: 5, imgPath: '../../assets/svg/warehouse-gray.svg' },
  { title: 'No of Warehouses', value: 5, top: 5, imgPath: '../../assets/svg/warehouse-gray.svg' },
];

function dashboard() {
  const auth = useAuth0();
  const userEmail = auth.user?.email || '';
  setLoggedInUserData(userEmail);

  let count: number = 0;

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
