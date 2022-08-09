import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

/* eslint-disable-next-line */
export interface LogoutButtonProps {}

export function LogoutButton(props: LogoutButtonProps) {
  const { logout } = useAuth0();

  const handleLogout = () => {
      logout({
        returnTo: window.location.origin,
      });
  };

  return (
    <Button onClick={handleLogout} variant="contained" className='createAcc' style={{width: "20%",marginTop:"10%"}}>
      Logout
    </Button>
  );
}

export default LogoutButton;
