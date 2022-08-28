import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';

function profileSetUp() {
  const navigate = useNavigate();
  return (
    <Grid container rowGap={0} columnGap={0}>
      <Grid container item xs={6} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid container item xs={6} direction="column" rowSpacing={5} style={{ maxWidth: '50%' }}>
          <Grid item xs={6} style={{ marginTop: '5%' }}>
            <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36 }} style={{ textAlign: 'center' }}>
              Hi there! <br />
              Tell us about yourself.
            </Typography>
          </Grid>

          <TextField id="standard-basic" label="Name" variant="standard" sx={{ mt: 6 }} />
          <TextField id="standard-basic" label="Phone Number" variant="standard" sx={{ mt: 3 }} />

          <Button
            variant="contained"
            className="createAcc"
            style={{ width: '100%', marginTop: '20%' }}
            onClick={() => {
              navigate('/procurement-manager/dashboard');
            }}
          >
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25', marginLeft: '20' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </Grid>
      </Grid>

      <Grid container item xs={6} alignItems="center" justifyContent="center" style={{ backgroundColor: '#DBDBDB' }}>
        <Grid item xs={6}>
          <img src="../../assets/svg/welcome.svg" alt="" style={{ width: 500 }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default profileSetUp;
