import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import logo from "../../../assets/imgs/logoDark.png";
export interface LandingFooterProps {}

export function LandingFooter(props: LandingFooterProps) {
  return (
    <div style={{backgroundColor:"F9FAFB"}}>
      <Container maxWidth="lg">
        <img src={logo} style={{ width: 130 }} alt="zuplyd's logo" />
        
        <Grid container>
          <Grid item sm={12} md={4}>
            <Typography
              variant="body2"
              gutterBottom
              component="p"
              sx={{ color:"#637381", mt:"20px", width:"70%"}}
            >
              The starting point for your next project based on easy-to-customize Material-UI © helps you build apps faster and better.
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              component="p"
              sx={{ color:"#637381", mt:"20px"}}
            >
                © 2022. All rights reserved
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <MailOutlineIcon style={{fontSize:"22px", marginRight:"10px"}}/>
                <Typography variant="subtitle2" gutterBottom style={{fontSize:"14px"}}>
                  info@example.com
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <PlaceIcon style={{fontSize:"22px", marginRight:"10px"}}/>
                <Typography variant="subtitle2" gutterBottom style={{fontSize:"14px"}}>
                  Colombo
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <PhoneInTalkIcon style={{fontSize:"22px", marginRight:"10px"}}/>
                <Typography variant="subtitle2" gutterBottom style={{fontSize:"14px"}}>
                  +94 717 679 714
                </Typography>
            </div> 
          </Grid>
          <Grid item sm={12} md={4}>
            <input type="text" placeholder='Email Address' style={{
              background: "rgba(145, 158, 171, 0.08)",
              borderRadius: "8px",
              fontSize:"14px",
              padding:"20px",
              width:"310px"
            }}/>
            <button style={{
              alignItems: "center",
              padding: "17px",
              background: "#FA541C",
              borderRadius: "8px",
              fontSize:"14px",
              cursor:"pointer"
            }}>
              <ArrowForwardIosIcon style={{color:"#FFF", fontSize:"10px"}}/>
            </button>
          </Grid>
        </Grid>
          
            
      </Container>
    </div>
  );
}

export default LandingFooter;
