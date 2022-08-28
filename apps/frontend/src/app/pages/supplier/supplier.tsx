import React from 'react';
import SideNav from '../../components/side-nav/side-nav';
import { Outlet } from 'react-router-dom';

function supplier() {
  return (
    <div className="outerContainer">
      <SideNav username={'abc@gmail.com'} userNum={4} />
      <Outlet />
    </div>
  );
}

export default supplier;
