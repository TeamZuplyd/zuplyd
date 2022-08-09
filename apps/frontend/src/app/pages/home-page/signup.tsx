import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import {useAuth0} from "@auth0/auth0-react";
import LoginButton from '../../components/login-button/login-button';
import LogoutButton from '../../components/logout-button/logout-button';
import SignupButton from '../../components/signup-button/signup-button';

function signup() {
    

    let { user } = useAuth0();

    if (!user) {
        user = {
            "username": "not logged in",
            "email": "notLoggedInEmail.email.com"
        }
    }

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

            <Typography variant="h4" sx={{ fontSize: 14, mt:0.5, color:"blue",cursor:"pointer", textAlign:"right"}} >
                Forgot password?
            </Typography>

            <LoginButton/>

            <LogoutButton/>

            <SignupButton/>

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

        {/* <Grid item xs={8} >  
                <img src="../../assets/svg/signup.svg" alt="" style={{width:500}} />
        </Grid> */}

        <div>{JSON.stringify(user, null, 2)}</div>

    </Grid>

</Grid>
  )
}

export default signup
