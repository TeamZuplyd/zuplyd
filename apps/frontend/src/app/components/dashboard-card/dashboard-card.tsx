/* eslint-disable-next-line */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export interface DashboardCardProps {}

const jsonArr: { [key: string]: any } = {
  "Warehouses": 10,

  "Shops" : 25,

  "Tier": "Free",

  "Shop Managers": 2,

  "Warehouse Managers": 2,
  
  "Procument Managers": 2
} 


export interface DashboardCardProps {
  theKey: string;
  theValue: any;
}

export function DashboardCard({theKey, theValue}: DashboardCardProps) {

  return (
    <Card sx={{ minWidth: 226, width:226, maxHeight:141, height:150, ml:2, mt:2 }}>
    <CardContent sx={{textAlign:"center"}}>

          <Grid xs={12} sx={{mb:3}}> 
              <Typography variant='h6' sx={{mb:1, textAlign:"center"}}>
                  {theKey}
              </Typography>
          </Grid>

          <Grid xs={12} style={{wordBreak: "break-word"}}>
              <Typography variant='h6' sx={{textAlign:"center"}}>
                  {theValue}
              </Typography>
          </Grid>
           
        {/* <Grid xs={12} sx={{mb:3}}> 
          <Typography variant='h6' sx={{mb:1, textAlign:"center"}}>
              {Warehouse A}
          </Typography>
        </Grid>

        <Grid xs={12} style={{wordBreak: "break-word"}}>
                <Typography variant='h6' sx={{textAlign:"center"}}>
                    Warehouse A
                </Typography>
        </Grid> */}
    
    </CardContent>
</Card>
  );
}

export default DashboardCard;
