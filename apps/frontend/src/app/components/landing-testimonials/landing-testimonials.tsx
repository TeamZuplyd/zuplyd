import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export interface LandingTestimonialsProps {}

export function LandingTestimonials(props: LandingTestimonialsProps) {
  const boxStyle = {
    background: 'linear-gradient(131.49deg, rgba(255, 255, 255, 0.4) 15.58%, rgba(255, 255, 255, 0.16) 78.16%)',
    backdropFilter: 'blur(40px)',
    borderRadius: '16px',
    height: '167px',
    width: '484px',
    marginRight: '20px',
  };

  const [tPosition, setTPosition] = useState('0px');

  let tend = false;
  let done = false;

  useEffect(() => {
    if (!tend) {
      setTPosition('-1420px');
      setInterval(() => {
        if (done) {
          setTPosition('-1420px');
        } else {
          setTPosition('0px');
        }
        done = !done;
        console.log('doing');
      }, 13000);
      tend = true;
    }
  }, []);

  return (
    <div style={{backgroundColor:"#161C24",paddingTop:5,paddingBottom:5, width:"100%"}}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item sm={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '60vh',
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <span style={{color:"#FA541C", fontSize:"12px", margin:"20px", fontWeight: 600,fontFamily: 'Poppins', fontStyle: "normal"}}>TESTIMONIALS</span>
                <Typography variant="h3" component="h3" gutterBottom style={{ fontWeight: 700, fontSize:"48px", color:"#FFF", fontFamily: 'Barlow',fontStyle: "normal"}}>
                  Who Loves Our Work
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="p"
                  style={{ width: "80%", color:"#A5C1D9", fontFamily: 'Poppins', fontStyle: "normal", fontWeight: 400 }}
                  align="center"
                >
                  Positive feedback we got so far
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={7}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                minHeight: '60vh',
                flexDirection: 'row',
                ml: '80px',
              }}
              style={{
                position: 'relative',
                overflowX: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                style={{
                  position: 'absolute',
                  left: tPosition,
                  transition: 'left 12s',
                  transitionTimingFunction: 'linear',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                  style={boxStyle}
                >
                  <Typography variant="h6" gutterBottom component="p" style={{ color: '#FFF' }}>
                    Eleanor Pena
                  </Typography>
                  <Typography variant="body2" gutterBottom style={{ color: '#BCCEDE' }}>
                    ABC company
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                  style={boxStyle}
                >
                  <Typography variant="h6" gutterBottom component="p" style={{ color: '#FFF' }}>
                    Eleanor Pena
                  </Typography>
                  <Typography variant="body2" gutterBottom style={{ color: '#BCCEDE' }}>
                    Procument Manager
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                  style={boxStyle}
                >
                  <Typography variant="h6" gutterBottom component="p" style={{ color: '#FFF' }}>
                    Eleanor Pena
                  </Typography>
                  <Typography variant="body2" gutterBottom style={{ color: '#BCCEDE' }}>
                    Procument Manager
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                  style={boxStyle}
                >
                  <Typography variant="h6" gutterBottom component="p" style={{ color: '#FFF' }}>
                    Eleanor Pena
                  </Typography>
                  <Typography variant="body2" gutterBottom style={{ color: '#BCCEDE' }}>
                    Procument Manager
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LandingTestimonials;
