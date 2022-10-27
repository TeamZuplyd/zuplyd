import { Button, Card, CardActions, CardContent, Chip, Divider, Grid, Typography } from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/system';
import React from 'react';
import Header from '../../components/header/header';

const CardHeading = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 500, fontSize: 27 }} variant="h5" component="div">
          Order ID: 22233123565
        </Typography>
        <Chip label="In Progress" color="warning" sx={{ fontSize: 16, marginLeft: 2 }} />
        <Button variant="outlined" sx={{ marginLeft: 'auto' }} startIcon={<DescriptionOutlinedIcon />}>
          Invoice
        </Button>
      </Box>

      <Box sx={{ display: 'flex', marginTop: 1 }}>
        <Typography sx={{ fontWeight: 400, fontSize: 18.5, color: '#BDBDBD' }} component="div">
          Order Date: <span style={{ color: '#575757' }}>Feb 16, 2022</span>
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: 18.5, margin: '0 10px', color: '#EEEEEE' }} component="div">
          |
        </Typography>
        <LocalShippingOutlinedIcon sx={{ color: '#00BB35', marginRight: 1 }} />
        <Typography sx={{ fontWeight: 400, fontSize: 18.5, color: '#00BB35' }} component="div">
          Estimated Delivery: May 14, 2022
        </Typography>
      </Box>
    </>
  );
};

const OrderItem = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100px', height: '100px', backgroundColor: '#F7F7F7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #EBEBEB', borderRadius: '16px' }} component={'img'} src={'../../../assets/imgs/nike.png'} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', marginLeft: '20px' }}>
        <Typography sx={{ fontWeight: 500, fontSize: 18, color: '#575757' }} component="div">
          Nike Air Max Shoes
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: 16, color: '#BDBDBD' }} component="div">
          White | Nike
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 'auto', marginRight: '20px' }}>
        <Typography sx={{ fontWeight: 600, fontSize: 18, color: 'black' }} component="div">
          $2500.00
        </Typography>

        <Typography sx={{ fontWeight: 400, fontSize: 16, color: '#BDBDBD' }} component="div">
          Qty: 5 x $500
        </Typography>
      </Box>
    </Box>
  );
};

const OrderDetails = () => {
  return (
    <Box>
      <Grid container>
        <Grid xs={6}>
          <Typography sx={{ fontWeight: 500, fontSize: 24, color: 'black' }} component="div">
            Payment
          </Typography>
          <Box sx={{ display: 'flex', marginBottom: 1, marginTop: 1, gap: 3 }}>
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: 17, color: '#575757', marginBottom: 1 }} component="div">
                Method:
              </Typography>
              <Chip icon={<LocalAtmOutlinedIcon sx={{ padding: '6px', backgroundColor: 'white', borderRadius: '50%', height: 'fit-content', minHeight: '30px', minWidth: '30px' }} />} label="Cash" color="default" sx={{ fontSize: 15, padding: '20px 10px', borderRadius: '7px', border: '0.5px solid #EBEBEB', backgroundColor: '#F7F7F7' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: 17, color: '#575757', marginBottom: 1 }} component="div">
                Status:
              </Typography>
              <Chip icon={<CheckCircleOutlineOutlinedIcon />} label="Done" color="success" sx={{ fontSize: 15 }} />
            </Box>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Typography sx={{ fontWeight: 500, fontSize: 24, color: 'black' }} component="div">
            Delivery
          </Typography>
          <Box sx={{ display: 'flex', marginBottom: 1, marginTop: 1, gap: 3 }}>
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: 17, color: '#575757', marginBottom: 1 }} component="div">
                Method:
              </Typography>
              <Chip icon={<LocalShippingOutlinedIcon sx={{ padding: '6px', backgroundColor: 'white', borderRadius: '50%', height: 'fit-content', minHeight: '30px', minWidth: '30px' }} />} label="Pick Up" color="default" sx={{ fontSize: 15, padding: '20px 10px', borderRadius: '7px', border: '0.5px solid #EBEBEB', backgroundColor: '#F7F7F7' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: 17, color: '#575757', marginBottom: 1 }} component="div">
                Delivery Address:
              </Typography>
              <Typography sx={{ fontWeight: 300, fontSize: 15, color: '#575757', marginBottom: 1 }} component="div">
                Nike Store<br></br>Shop No 42 /43 / 44<br></br>Level 3<br></br>One Galle Face Mall<br></br>Colombo 2, 00200
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

function reports() {
  return (
    <>
      <Header title={'Reports'} />
      <Grid container item xs={12} alignItems="center" justifyContent="center">
        <Grid container xs={12} direction="column" rowSpacing={1} style={{ maxWidth: '50%' }}>
          <Card sx={{ minWidth: 275, padding: 3 }}>
            <CardContent>
              <CardHeading />
              <Divider sx={{ margin: '25px 0' }} />
              <OrderItem />
              <Divider sx={{ margin: '25px 0' }} />
              <OrderDetails />
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
              <Button startIcon={<CheckCircleIcon />} size="large" variant="contained" color={'success'}>
                Accept
              </Button>
              <Button startIcon={<CancelIcon />} size="large" variant="outlined" color={'error'}>
                Reject
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default reports;
