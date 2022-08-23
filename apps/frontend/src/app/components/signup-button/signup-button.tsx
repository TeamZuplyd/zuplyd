import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useEffect } from 'react';

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

  useEffect(() => {
    handleSignUp();
  }, []);

  return <div></div>;
}

export default SignupButton;
