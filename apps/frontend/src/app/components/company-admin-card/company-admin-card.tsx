/* eslint-disable-next-line */
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export interface CompanyAdminCardProps {}

const arr: any = ["Isuru Nishadha", "0774145236"]


export function CompanyAdminCard(props: CompanyAdminCardProps) {
  return (
    <Card sx={{ minWidth: 450, width:450, maxHeight:141, height:141, ml:2 }}>
      <CardContent sx={{pl:3}}>
          <Typography variant='h6' sx={{mb:1}}>
              Warehouse A
          </Typography>
             
          <Grid container rowGap={2} >
              <Grid item xs={1}> 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sideNav-icon" viewBox="0 0 20 20" fill="currentColor" style={{height:18}}>
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
              </Grid>

              <Grid item xs={8} style={{wordBreak: "break-word"}}>
                  <Typography variant="body2" >{arr[0]}</Typography>
              </Grid>
          </Grid>

          <Grid container sx={{mt:1}} >
              <Grid item xs={1}> 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sideNav-icon" viewBox="0 0 20 20" fill="currentColor" style={{height:18, marginRight:10}}>
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
              </Grid>

              <Grid item xs={8} style={{wordBreak: "break-word"}}>
                  <Typography variant="body2" >{arr[1]}</Typography>
              </Grid>
          </Grid>
      </CardContent>

      <CardActions>
        <Button size="small" style={{position: "relative", left:340, bottom:50}}>Learn More</Button>
      </CardActions>
  </Card>
  );
}

export default CompanyAdminCard;
