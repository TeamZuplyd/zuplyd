import React from 'react';
import Header from '../../components/header/header';
import { setLoggedInUserData } from '../../utils';
import { useAuth0, User } from '@auth0/auth0-react';

function dashboard() {
  const auth = useAuth0();
  const userEmail = auth.user?.email || '';
  setLoggedInUserData(userEmail);
  return <Header title={'Dashboard'} />;
}

export default dashboard;
