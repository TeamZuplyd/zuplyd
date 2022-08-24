import React from 'react';
import SideNav from '../../components/side-nav/side-nav';
import { Outlet } from 'react-router-dom';

function shopManager() {
  return (
    <div className="outerContainer">
      <SideNav username={'thisarigun99@gmail.com'} userNum={3} />
      <Outlet />
    </div>
  );
}

export default shopManager;
