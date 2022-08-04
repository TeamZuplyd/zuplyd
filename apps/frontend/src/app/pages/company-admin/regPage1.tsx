import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

function regPage1() {
  return (

    <Grid container rowGap={0} columnGap={0}>

        <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{minHeight:"100vh"}}>  
        
            <Grid container item xs={6}   direction="column"  rowSpacing={5} style={{ maxWidth: '50%' }}>  
                <Grid  item xs={6} style={{marginTop:"5%"}}>  
                    <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36}} style={{textAlign:"center"}}>
                        A Flexible but Powerful solution to manage your supply chain.
                    </Typography>
                </Grid>

                <Grid container item xs={6} sx={{mt:2}}>  
                    <Button variant="contained" className='signupWithGoogle' style={{width: "100%"}}>
                        <Grid item xs={0.5} >  
                            <img src="../../assets/imgs/Google.jpg" alt="" style={{width:30}} />
                        </Grid>

                        <Grid item xs={11.5}>  
                            Sign up with Google
                        </Grid>
                    </Button>
                </Grid>

                <Divider sx={{mt: 4, mb:2}} style={{color:"#b5bec9"}}> OR </Divider>

                <TextField id="standard-basic" label="Company Email" variant="standard"/>
                <TextField id="standard-basic" label="Password" variant="standard" sx={{mt:2}} />

                <Button variant="contained" className='createAcc' style={{width: "100%",marginTop:"10%"}}>
                    Create Account
                </Button>
                
                <Typography variant="h5" sx={{ fontWeight: 500, fontSize: 15, textAlign: 'center', mt:2 }} style={{color:"#889099"}}>
                    Already have an account? <span style={{color:"blue", cursor:"pointer"}}>Log In</span> 
                </Typography>
                
            </Grid>
        </Grid>

        

        <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{backgroundColor:"#DBDBDB"}}>  

            <Grid item xs={6} >  
                    <img src="../../assets/svg/ca-p1.svg" alt="" style={{width:500}} />
            </Grid>

        </Grid>

    </Grid>

)
}

export default regPage1