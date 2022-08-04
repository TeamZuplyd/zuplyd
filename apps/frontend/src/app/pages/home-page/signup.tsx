import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

function signup() {
  return (
    <Grid container rowGap={0} columnGap={0}>

    <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{minHeight:"100vh"}}>  
    
        <Grid container item xs={6} direction="column"  rowSpacing={1} style={{ maxWidth: '50%' }}>  
            <Grid  item xs={6}>  
                <img src="../../assets/imgs/logoDark.png" alt="" style={{width:"65%"}}/>
            </Grid>

            <Grid  item xs={6}>  
                <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36}} >
                    Welcome back!
                </Typography>

                <Typography variant="h4" sx={{ fontSize: 18, mt:0.5}} >
                    Log in to your account
                </Typography>
            </Grid>


            <TextField id="standard-basic" label="Company Name" variant="standard" sx={{mt:4}} />
            <TextField id="standard-basic" label="Passwrd" variant="standard" sx={{mt:3}} />
            <Typography variant="h4" sx={{ fontSize: 14, mt:0.5, color:"blue",cursor:"pointer", textAlign:"right"}} >
                Forgot password?
            </Typography>

            <Button variant="contained" className='createAcc' style={{width: "100%",marginTop:"10%"}}>
                Login
            </Button>

            <Divider sx={{mt: 4, mb:2}} style={{color:"#b5bec9"}}> OR </Divider>

            <Grid container item xs={6} sx={{mt:1}}>  
                <Button variant="contained" className='signupWithGoogle' style={{width: "100%"}}>
                    <Grid item xs={0.5} >  
                        <img src="../../assets/imgs/Google.jpg" alt="" style={{width:30}} />
                    </Grid>

                    <Grid item xs={11.5}>  
                        Sign up with Google
                    </Grid>
                </Button>
            </Grid>

            <Typography variant="h5" sx={{ fontWeight: 500, fontSize: 15, textAlign: 'center', mt:2 }} style={{color:"#889099"}}>
                New here? <span style={{color:"blue", cursor:"pointer"}}>Create an account</span> 
            </Typography>

        </Grid>
    </Grid>

    

    <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{backgroundColor:"#DBDBDB"}}>  

        <Grid item xs={8} >  
                <img src="../../assets/svg/signup.svg" alt="" style={{width:500}} />
        </Grid>

    </Grid>

</Grid>
  )
}

export default signup