import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function forgetPassword() {
  return (
    <Grid container rowGap={0} columnGap={0}>

    <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{minHeight:"100vh"}}>  
    
        <Grid container item xs={6} direction="column"  rowSpacing={2} style={{ maxWidth: '50%' }}>  
            <Grid  item xs={6}>  
                <Button variant="contained" className='goBack' style={{width: "30%"}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:"25"}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                    Go Back
                </Button>
            </Grid>

            <Grid  item xs={6}>  
                <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36}} >
                    Reset Password
                </Typography>
            </Grid>

            <Typography variant="h4" sx={{fontSize: 14, mt:2}} >
                Enter the email address associated with your account. We will send you a link to reset your password
            </Typography>


            <TextField id="standard-basic" label="Company Name" variant="standard" sx={{mt:8}} />

            <Button variant="contained" className='createAcc' style={{width: "100%",marginTop:"10%"}}>
                Send Link
            </Button>

            <Typography variant="h5" sx={{ fontWeight: 500, fontSize: 15, textAlign: 'center', mt:2 }} style={{color:"#889099"}}>
                New here?  <span style={{color:"blue", cursor:"pointer"}}>Create an account</span> 
            </Typography>

        </Grid>
    </Grid>

    

    <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{backgroundColor:"#DBDBDB"}}>  

        <Grid item xs={6} >  
                <img src="../../assets/svg/forgot.svg" alt="" style={{width:500}} />
        </Grid>

    </Grid>

</Grid>
  )
}

export default forgetPassword