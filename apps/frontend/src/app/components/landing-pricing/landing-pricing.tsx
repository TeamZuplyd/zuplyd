import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import planBasic from "../../../assets/imgs/ic_plan_basic.png";
import planPremium from "../../../assets/imgs/ic_plan_premium.png";
import planStarter from "../../../assets/imgs/ic_plan_starter.png";

import checkMark from "../../../assets/imgs/ic_check.png";

export interface LandingPricingProps {}

function StartButton(){

  const btnStyle ={
    background: "#FA541C",
    borderRadius: "8px",
    color:"#FFF",
    padding: "11px 22px",
    cursor:"pointer",
    marginTop:"40px",
    width:"100%"
  }

  return(
    <button style={btnStyle}>Get Started</button>
  );
}

export function LandingPricing(props: LandingPricingProps) {
  return (
    <Container maxWidth="lg" id="pricing">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          pb:"30px"
        }}
      >
        <span style={{color:"#FA541C", fontSize:"12px", margin:"30px", fontWeight: 600}}>PRICING</span>
        <Typography variant="h3" component="h3" gutterBottom style={{ fontWeight: 700, fontSize:"48px"}}>
          Check Our Plans
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          component="p"
          style={{ width: "35%", color:"#637381" }}
          align="center"
        >
          Choose the perfect plan for your needs. Always flexible to grow
        </Typography>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width:"100%"
        }}
      >
        <Box
          sx={{
            width:"30%"
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width:"100%",
              flexDirection: 'column',
              p:"30px",
              '&:hover': {
                top:"-20px"
              }
            }}
            style={{
              position:"relative",
              boxShadow: "-4px 4px 24px rgba(145, 158, 171, 0.08)",
              borderRadius: "16px"
            }}
          >
            <span style={{fontWeight: 700, fontSize: "16px", color: "#212B36"}}>Zuplyd</span>
            <span style={{fontWeight: 700, fontSize: "24px",color: "#FA541C"}}>Starter</span>
            <img src={planBasic} style={{position:"absolute",right:"30px"}}/>
            <p style={{fontWeight: 700,fontSize: "36px", marginTop:"40px"}}>$0<span style={{fontSize: "20px",color: "#919EAB"}}>/mo</span></p>
            <Typography
              variant="body2"
              gutterBottom
              component="p"
              sx={{ color:"#637381", mt:"40px"}}
            >
              Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien
            </Typography>
            <ul style={{listStyleImage:`url(${checkMark})`, margin:"30px"}}>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
            </ul>

            <StartButton />
          </Box>
          
        </Box>
        <Box
          sx={{
            width:"30%"
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width:"100%",
              flexDirection: 'column',
              p:"30px",
              '&:hover': {
                top:"-20px"
              }
            }}
            style={{
              position:"relative",
              boxShadow: "-16px 16px 56px -8px rgba(145, 158, 171, 0.16)",
              borderRadius: "16px"
            }}
          >
            <span style={{fontWeight: 700, fontSize: "16px", color: "#212B36"}}>Zuplyd</span>
            <span style={{fontWeight: 700, fontSize: "24px",color: "#FA541C"}}>Plus</span>
            <img src={planStarter} style={{position:"absolute",right:"30px"}}/>
            <p style={{fontWeight: 700,fontSize: "36px", marginTop:"40px"}}>$5<span style={{fontSize: "20px",color: "#919EAB"}}>/mo</span></p>
            <Typography
              variant="body2"
              gutterBottom
              component="p"
              sx={{ color:"#637381", mt:"40px"}}
            >
              Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien
            </Typography>
            <ul style={{listStyleImage:`url(${checkMark})`, margin:"30px"}}>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
            </ul>

            <StartButton />
          </Box>
          
        </Box>
        <Box
          sx={{
            width:"30%"
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width:"100%",
              flexDirection: 'column',
              p:"30px",
              '&:hover': {
                top:"-20px"
              }
            }}
            style={{
              position:"relative",
              boxShadow: "-24px 24px 72px -8px rgba(145, 158, 171, 0.24)",
              borderRadius: "16px"
            }}
          >
            <span style={{fontWeight: 700, fontSize: "16px", color: "#212B36"}}>Zuplyd</span>
            <span style={{fontWeight: 700, fontSize: "24px",color: "#FA541C"}}>Premium</span>
            <img src={planPremium} style={{position:"absolute",right:"30px"}}/>
            <p style={{fontWeight: 700,fontSize: "36px", marginTop:"40px"}}>$10<span style={{fontSize: "20px",color: "#919EAB"}}>/mo</span></p>
            <Typography
              variant="body2"
              gutterBottom
              component="p"
              sx={{ color:"#637381", mt:"40px"}}
            >
              Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien
            </Typography>
            <ul style={{listStyleImage:`url(${checkMark})`, margin:"30px"}}>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
              <li>Auto update mode</li>
            </ul>

            <StartButton />
          </Box>
          
        </Box>
      </Box>
      </Box>
    </Container>
  );
}

export default LandingPricing;
