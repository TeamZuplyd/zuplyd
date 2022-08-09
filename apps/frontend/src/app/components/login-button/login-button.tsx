import {useAuth0} from "@auth0/auth0-react";
import Button from '@mui/material/Button';

/* eslint-disable-next-line */
export interface LoginButtonProps {}

export function LoginButton(props: LoginButtonProps) {
  
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
      await loginWithRedirect({
          appState:{
              returnTo: "/"
          },
      });
  };

  return (
    <Button onClick={handleLogin} variant="contained" className='createAcc' style={{width: "20%",marginTop:"10%"}}>
      Login
    </Button>
  );
}

export default LoginButton;
