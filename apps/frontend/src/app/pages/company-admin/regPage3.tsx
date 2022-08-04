import React from 'react'
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

function regPage3() {
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
                    Select the distribution structure.
                </Typography>
            </Grid>


            <Grid  item xs={6}>  
                <Card sx={{ maxWidth: "100%", padding:"2%", backgroundColor:"#e6e1e1", mt:5}} >
                    <Grid container xs={12}>
                        <Grid item direction="column" xs={4}>
                            <img src="../../assets/imgs/c.png" alt=""  style={{width:100}}/>
                        </Grid>

                        <Grid item direction="column" xs={8}>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontSize: 20}}>
                                Centralized
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                A single top level warehouse collects goods from suppliers and distributes to other warehouses
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid  item xs={6}>  
                <Card sx={{ maxWidth: "100%", padding:"2%",  backgroundColor:"#ffe4c4", mt:3 }}>
                        <Grid container xs={12}>
                            <Grid item direction="column" xs={4}>
                                <img src="../../assets/imgs/c.png" alt=""  style={{width:100}}/>
                            </Grid>

                            <Grid item direction="column" xs={8}>
                                <Typography gutterBottom variant="h5" component="div" sx={{fontSize: 20}}>
                                    Centralized
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    A single top level warehouse collects goods from suppliers and distributes to other warehouses
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
            </Grid>

        

            <Button variant="contained" className='createAcc' style={{width: "100%",marginTop:"20%"}}>
                Continue
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:"25", marginLeft:"20"}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </Button>
        </Grid>
    </Grid>

    

    <Grid container item xs={6} alignItems="center"  justifyContent="center" style={{backgroundColor:"#DBDBDB"}}>  

        <Grid item xs={6} >  
                <img src="../../assets/svg/ca-p2.svg" alt="" style={{width:500}} />
        </Grid>

    </Grid>

</Grid>
  )
}

export default regPage3