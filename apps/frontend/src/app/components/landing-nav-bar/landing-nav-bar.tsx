import Container from '@mui/material/Container';

import { Link } from 'react-scroll';

import logo from "../../../assets/imgs/logoDark.png";

import "./styles.css";

export interface LandingNavBarProps {}

export function LandingNavBar(props: LandingNavBarProps) {

  const navBarStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  };

  return (
    <Container maxWidth="xl" sx={navBarStyle}>
      <img src={logo} style={{ width: 130 }} alt="zuplyd's logo" />
      <div>
        <Link className='navlink' to='hero' smooth={true}>Home</Link>
        <Link className='navlink' to='features' smooth={true}>Features</Link>
        <Link className='navlink' to='pricing' smooth={true}>Pricing</Link>
        <Link className='navlink' to='faq' smooth={true}>FAQ</Link>
      </div>
      <div>
          <button className='landbtn'>Login</button>
          <button className='landbtn dark'>Join us</button>
      </div>
    </Container>
  );
}

export default LandingNavBar;
