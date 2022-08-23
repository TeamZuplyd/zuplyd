import Container from '@mui/material/Container';
import { useAuth0 } from '@auth0/auth0-react';

import { Link } from 'react-scroll';

import logo from '../../../assets/imgs/logoDark.png';

import './styles.css';

export interface LandingNavBarProps {}

export function LandingNavBar(props: LandingNavBarProps) {
  const { loginWithRedirect, logout } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      screen_hint: 'signup',
      appState: {
        returnTo: '/comp-init-1',
      },
    });
  };

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/',
      },
    });
  };
  const navBarStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  return (
    <Container maxWidth="xl" sx={navBarStyle}>
      <img src={logo} style={{ width: 130 }} alt="zuplyd's logo" />
      <div>
        <Link onClick={handleLogout} className="navlink" to="hero" smooth={true}>
          Home
        </Link>
        <Link className="navlink" to="features" smooth={true}>
          Features
        </Link>
        <Link className="navlink" to="pricing" smooth={true}>
          Pricing
        </Link>
        <Link className="navlink" to="faq" smooth={true}>
          FAQ
        </Link>
      </div>
      <div>
        <button className="landbtn" onClick={handleLogin}>
          Login
        </button>
        <button className="landbtn dark" onClick={handleSignUp}>
          Join us
        </button>
      </div>
    </Container>
  );
}

export default LandingNavBar;
