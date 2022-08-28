import { CSSProperties } from "react";

import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import TuneIcon from '@mui/icons-material/Tune';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export interface LandingFeaturesProps {}

export function LandingFeatures(props: LandingFeaturesProps) {

  useEffect(()=>{
    Aos.init({duration:1000});
  },[]);

  const fBox1:CSSProperties ={
    background: "linear-gradient(110.5deg, rgba(14, 164, 248, 0.4) 3.13%, rgba(255, 0, 214, 0.16) 101.4%)",
    backdropFilter: "blur(40px)",
    borderRadius: "16px",
    textAlign: "center",
    width:"70%",
    padding:"20px"
  }

  const fBox2:CSSProperties ={
    background: "linear-gradient(146.17deg, rgba(111, 252, 0, 0.4) 1.28%, rgba(0, 255, 224, 0.16) 102.44%)",
    backdropFilter: "blur(40px)",
    borderRadius: "16px",
    textAlign: "center",
    width:"219px",
    height:"258px",
    padding:"20px",
    position:"absolute",
    top:0,
    left:"-70px"
  }

  const fBox3:CSSProperties ={
    background: "linear-gradient(100.91deg, rgba(255, 247, 49, 0.4) 0%, rgba(248, 238, 0, 0.204) 100.48%)",
    backdropFilter: "blur(40px)",
    borderRadius: "16px",
    textAlign: "center",
    width:"352px",
    height:"185px",
    padding:"20px",
    position:"absolute",
    top:0,
    right:"20px"
  }

  const fBox4:CSSProperties ={
    background: "linear-gradient(131.49deg, rgba(255, 72, 72, 0.4) 15.58%, rgba(252, 142, 14, 0.4) 78.16%)",
    backdropFilter: "blur(40px)",
    borderRadius: "16px",
    textAlign: "center",
    width:"351px",
    height:"153px",
    padding:"20px",
    position:"absolute",
    bottom:"80px",
    left:"-110px"
  }

  const fBox5:CSSProperties ={
    background: "linear-gradient(141.75deg, rgba(5, 255, 225, 0.4) 11.75%, rgba(50, 146, 235, 0.16) 97.88%)",
    backdropFilter: "blur(40px)",
    borderRadius: "16px",
    textAlign: "center",
    width:"276px",
    height:"211px",
    padding:"40px",
    position:"absolute",
    bottom:"90px",
    right:"10px"
  }


  return (
    <div style={{backgroundColor:"#161C24",paddingTop:5,paddingBottom:5, width:"100%"}} id="features">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item sm={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              minHeight="60vh"
              sx={{ flexDirection: "column" }}
              style={{ textAlign: "center" }}
            >
              <span style={{color:"#FA541C", fontSize:"12px"}}>FEATURE HIGHLIGHTS</span>
              <Typography variant="h3" component="h3" gutterBottom style={{ width: "70%", fontWeight: 700, color:"#FFF", fontSize:"48px"}} align="left">
                Have Everything You Need
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="p"
                style={{ width: "70%", color:"#A5C1D9" }}
                align="left"
              >
                A smarter way to supply chain management, no matter what business you’re in.
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ flexDirection: "column", mt:6 }}
                style={fBox1}
                data-aos="fade"
              >
                <TaskIcon sx={{ color: "#FFF",fontSize: 63, mb:2 }}/>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="p"
                  style={{ color:"#FFF" }}
                >
                  Dynamic Attributes
                </Typography>
                <Typography variant="body2" gutterBottom style={{ color:"#BCCEDE" }}>
                  Define attributes if items as you need.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box
              minHeight="60vh"
              style={{position:"relative"}}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ flexDirection: "column", mt:6 }}
                style={fBox2}
                data-aos="fade-down"
              >
                <NotificationImportantIcon sx={{ color: "#FFF",fontSize: 63, mb:2 }}/>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="p"
                  style={{ color:"#FFF" }}
                >
                  Low Inventory Notifications
                </Typography>
                <Typography variant="body2" gutterBottom style={{ color:"#BCCEDE" }}>
                  Get notified when stocks are reach lower limit
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ flexDirection: "column", mt:6, ...fBox3 }}
                
                data-aos="fade-left"
              >
                <TaskIcon sx={{ color: "#FFF",fontSize: 63, mb:2 }}/>
                
                <Typography
                  variant="h6"
                  gutterBottom
                  component="p"
                  style={{ color:"#FFF" }}
                >
                  Dynamic Attributes
                </Typography>
                <Typography variant="body2" gutterBottom style={{ color:"#BCCEDE" }}>
                  Define attributes if items as you need.
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ flexDirection: "row", mt:6 }}
                style={fBox4}
                data-aos="fade-right"
              >
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="p"
                    style={{ color:"#FFF" }}
                    align="right"
                  >
                    Flexible Output Rules
                  </Typography>
                  <Typography variant="body2" gutterBottom style={{ color:"#BCCEDE" }} align="right">
                    Customixable rules to prioratize restocking process
                  </Typography>
                </div>
                <TuneIcon sx={{ color: "#FFF",fontSize: 63, mb:2 }}/>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ flexDirection: "column", mt:6 }}
                style={fBox5}
                data-aos="fade-up"
              >
                <ThumbUpIcon sx={{ color: "#FFF",fontSize: 63, mb:2 }}/>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="p"
                  style={{ color:"#FFF" }}
                >
                  Quality  Assurance
                </Typography>
                <Typography variant="body2" gutterBottom style={{ color:"#BCCEDE" }}>
                Handle batch specific quality issues
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LandingFeatures;
