import React from 'react';
import SideNav from '../../components/side-nav/side-nav';
import { Outlet } from 'react-router-dom';

function whManager() {
  return (
    <div className="outerContainer">
      <SideNav username={'isurunishadha@gmail.com'} userNum={2} />
      <Outlet />
    </div>
  );
}

export default whManager;
