import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';


import manWithBox from "../../../assets/imgs/manwithabox.png";
import vector from "../../../assets/imgs/vector1.png";

export interface LandingHeroProps {}

export function LandingHero(props: LandingHeroProps) {

  const btnStyle ={
    background: "#FA541C",
    boxShadow: "0px 0px 38px rgba(250, 84, 28, 0.3)",
    borderRadius: "8px",
    color:"#FFF",
    padding: "11px 22px",
    cursor:"pointer",
    marginTop:"40px"
  }

  return (
    <Container maxWidth="lg" id="hero">
      <Grid container>
        <Grid item sm={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            minHeight="80vh"
            sx={{ flexDirection: "column" }}
            style={{ textAlign: "center" }}
          >
            <Typography variant="h2" component="h1" gutterBottom style={{ width: "90%", fontWeight: 700,textShadow: "7px 9px 23px rgba(0, 0, 0, 0.15)", fontFamily: 'Barlow'}} align="left">
              Say <span className='highlight'>hello!</span> to your ideal inventory solution
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              component="p"
              style={{ width: "90%", color:"#637381", fontFamily: 'Poppins', fontWeight: 400, fontSize: "16px"}}
              align="left"
            >
              A supply chain management system for small to medium range businesses to stay on top of their inventory, assets, and more.
            </Typography>
            
            <button style={btnStyle}>Try For Free</button>
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
            style={{position:"relative"}}
          >
            <img
              src={manWithBox}
              alt="a man with a box"
              style={{position:"absolute", width:"626px",bottom:"-230px",zIndex:-50}}
            />
            <img
              src={vector}
              alt="vector"
              style={{position:"absolute",zIndex:-100, bottom:"0px"}}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingHero;
