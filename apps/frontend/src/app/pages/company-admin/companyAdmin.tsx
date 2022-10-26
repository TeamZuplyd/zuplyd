import React from 'react';
import SideNav from '../../components/side-nav/side-nav';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';

function companyAdmin() {
  return (
    <div className="outerContainer">
      <SideNav userNum={0} />
      {/* <Header title={'Dashboard'} /> */}

      <Outlet />
    </div>
  );
}

export default companyAdmin;
