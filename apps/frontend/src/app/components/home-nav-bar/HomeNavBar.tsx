/* eslint-disable-next-line */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../../../assets/imgs/logoDark.png";

interface NavProps {
  handleLogin: () => void;
  handleSignup: () => void;
}

export default function HomeNavBar(props: NavProps) {
  const appBarStyle = {
    bgcolor: "#fff",
    color: "#000"
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={appBarStyle}>
        <Toolbar>
          <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1 }}>
            <img src={logo} style={{ width: 130 }} alt="zuplyd's logo" />
          </Typography>
          <Button color="inherit" onClick={props.handleLogin} style={{fontSize:"1.5rem"}}>
            Login
          </Button>
          <Button color="inherit" onClick={props.handleSignup} style={{fontSize:"1.5rem"}}>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
