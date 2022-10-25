import React from 'react';
import Header from '../../components/header/header';
import { setLoggedInUserData } from '../../utils';

function dashboard() {
  setLoggedInUserData();
  return <Header title={'Dashboard'} />;
}

export default dashboard;
