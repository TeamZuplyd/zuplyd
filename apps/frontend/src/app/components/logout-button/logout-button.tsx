import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface LogoutButtonProps {}

export function LogoutButton(props: LogoutButtonProps) {
  const { logout } = useAuth0();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('comp_id');

    logout({
      returnTo: window.location.origin,
    });
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div></div>;
}

export default LogoutButton;
