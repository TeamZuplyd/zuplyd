import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

/* eslint-disable-next-line */
export interface SignupButtonProps {}

export function SignupButton(props: SignupButtonProps) {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      screen_hint: 'signup',
      appState: {
        returnTo: '/profile',
      },
    });
  };

  return (
    <Button onClick={handleSignUp} variant="contained" className="createAcc" style={{ width: '20%', marginTop: '10%' }}>
      Sign Up
    </Button>
  );
}

export default SignupButton;
