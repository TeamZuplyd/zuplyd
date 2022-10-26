import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import { CheckCircleOutlineOutlined, LocalAtmOutlined, LocalShippingOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Divider, FormGroup, Grid, List, ListItem, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PurchaseOrder from '../../components/supplier/purchase-order';
import FormComponent from '../../components/form-component/form-component';

type TierItemProps = {
  id: number;
  name: string;
  price: number;
  description: string[];
  handleSelect: (id: number) => void;
  selected: number;
  tierIcon: React.ReactNode;
};

let request = {
    _id: 232323314355,
    item: {
        _id: 33423423423,
        itemName: 'Nike Airmax Shoes',

    },
    requiredDate: '2022/10/22',
    requiredQuantity: 20,
    suppliableQuantity: 10,
    
}

function TierItem({ id, name, price, description, handleSelect, selected, tierIcon }: TierItemProps) {
  return (
    <Card onClick={() => handleSelect(id)} className={selected === id ? 'highlightTier' : ''}>
      <CardActionArea>
        <CardContent sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
          {tierIcon}
          <Typography variant="subtitle1" sx={{ color: '#1F2937' }}>
            {name}
          </Typography>

          {/* <Typography variant="h6" textAlign="center">
            <Typography variant="caption">
              <span style={{ verticalAlign: 'super' }}>LKR </span>
            </Typography>
            {price}
            <Typography variant="caption">
              <span> /mo</span>
            </Typography>
          </Typography> */}
          {/* <Typography variant="body1" className="tierPoints" textAlign="left">
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              {description.map((item, index) => {
                return (
                  <ListItem sx={{ display: 'list-item', pl: 0 }} key={index}>
                    {item}
                  </ListItem>
                );
              })}
            </List>
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const OrderItem = ({ item }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
        {/* <Switch /> */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#575757' }} component="div">
            Required Quantity:
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#575757', alignSelf: 'flex-end' }} component="div">
            25
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#575757', alignSelf: 'flex-end' }} component="div">
            Suppliable Quantity:
          </Typography>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 'auto' }}>
            <Typography sx={{ fontWeight: 400, fontSize: 16, color: '#BDBDBD' }} component="div">
              Qty:
            </Typography>
            {item ? (
              <Typography sx={{ fontWeight: 400, fontSize: 16, color: '#BDBDBD' }} component="div">
                {item.quantity}
              </Typography>
            ) : (
              <TextField
                sx={{ width: '25%' }}
                id="outlined-number"
                label=""
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
            <Typography sx={{ fontWeight: 400, fontSize: 16, color: '#BDBDBD' }} component="div">
              x
            </Typography>
            {item ? (
              <Typography sx={{ fontWeight: 400, fontSize: 16, color: '#BDBDBD' }} component="div">
                {item.price}
              </Typography>
            ) : (
              <TextField
                sx={{ width: '25%' }}
                id="outlined-number"
                label=""
                type="number"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          </Box>
        </Box>

        <Typography sx={{ fontWeight: 600, fontSize: 18, color: 'black' }} component="div">
          $2500.00
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
              <Chip icon={<LocalAtmOutlined sx={{ padding: '6px', backgroundColor: 'white', borderRadius: '50%', height: 'fit-content', minHeight: '30px', minWidth: '30px' }} />} label="Cash" color="default" sx={{ fontSize: 15, padding: '20px 10px', borderRadius: '7px', border: '0.5px solid #EBEBEB', backgroundColor: '#F7F7F7' }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 400, fontSize: 17, color: '#575757', marginBottom: 1 }} component="div">
                Status:
              </Typography>
              <Chip icon={<CheckCircleOutlineOutlined />} label="Done" color="success" sx={{ fontSize: 15 }} />
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
              <Chip icon={<LocalShippingOutlined sx={{ padding: '6px', backgroundColor: 'white', borderRadius: '50%', height: 'fit-content', minHeight: '30px', minWidth: '30px' }} />} label="Pick Up" color="default" sx={{ fontSize: 15, padding: '20px 10px', borderRadius: '7px', border: '0.5px solid #EBEBEB', backgroundColor: '#F7F7F7' }} />
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

const CardHeading = ({ orderStatus, orderId, progress }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 500, fontSize: 23 }} variant="h5" component="div">
          {orderStatus === 1 ? `Quotation ID: ${orderId}` : (orderStatus === 2 || 3) && `Purchase Order: ${orderId}`}
        </Typography>
        {progress === 2 ? <Chip label={'In Progess'} color="warning" sx={{ fontSize: 13, marginLeft: 2 }} /> : progress === 3 && <Chip label={'Completed'} color="success" sx={{ fontSize: 13, marginLeft: 2 }} />}

        <Button variant="outlined" sx={{ marginLeft: 'auto' }} startIcon={<DescriptionOutlinedIcon />}>
          Invoice
        </Button>
      </Box>

      <Box sx={{ display: 'flex', marginTop: 1 }}>
        <Typography sx={{ fontWeight: 400, fontSize: 13.5, color: '#BDBDBD' }} component="div">
          Order Date: <span style={{ color: '#575757' }}>Feb 16, 2022</span>
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: 13.5, margin: '0 10px', color: '#EEEEEE' }} component="div">
          |
        </Typography>
        <Typography sx={{ fontWeight: 400, fontSize: 13.5, color: '#BDBDBD' }} component="div">
          Required Date: <span style={{ color: '#575757' }}>Feb 16, 2022</span>
        </Typography>
      </Box>
    </>
  );
};

const QuotationRequest = ({ setSelectedStep, item }) => {
  const [selected, setSelected] = useState(0);

  const handleSelected = (index: number) => {
    setSelected(index);
    // console.log('selected ' + index);
  };
  return (
    <Grid container item xs={12} alignItems="center" justifyContent="center">
      <Grid container xs={12} direction="column" rowSpacing={1}>
        <Card sx={{ minWidth: 275, padding: 3 }}>
          <CardContent>
            <CardHeading orderStatus={1} orderId={12222} progress={1} />
            <Divider sx={{ margin: '25px 0' }} />
            <OrderItem item={item} />
            <Divider sx={{ margin: '25px 0' }} />
            {/* <OrderDetails /> */}
            <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#575757' }} component="div">
              Available Delivery Methods:
            </Typography>
            <Box sx={{ width: '35%', display: 'flex', gap: '10px', marginTop: 1 }}>
              <Box sx={{ width: '50%' }}>
                <TierItem id={2} name={'Delivery'} price={22} description={['This is a description']} handleSelect={handleSelected} selected={selected} tierIcon={<LocalShippingOutlinedIcon sx={{ marginRight: 1 }} />} />
              </Box>
              <Box sx={{ width: '50%' }}>
                <TierItem id={1} name={'Pickup'} price={22} description={['This is a description']} handleSelect={handleSelected} selected={selected} tierIcon={<InventoryIcon sx={{ marginRight: 1 }} />} />
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
            <Button startIcon={<CheckCircleIcon />} size="large" variant="contained" color={'success'} onClick={() => setSelectedStep(1)}>
              Accept
            </Button>
            <Button startIcon={<CancelIcon />} size="large" variant="outlined" color={'error'}>
              Reject
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

const PurchaseOrderCard = ({ setSelectedStep, item, progress }) => {
  const [selected, setSelected] = useState(0);

  const handleSelected = (index: number) => {
    setSelected(index);
    // console.log('selected ' + index);
  };
  return (
    <Grid container item xs={12} alignItems="center" justifyContent="center">
      <Grid container xs={12} direction="column" rowSpacing={1}>
        <Card sx={{ minWidth: 275, padding: 3 }}>
          <CardContent>
            <CardHeading orderStatus={2} orderId={122222} progress={progress} />
            <Divider sx={{ margin: '25px 0' }} />
            <OrderItem item={item} />
            <Divider sx={{ margin: '25px 0' }} />
            {/* <OrderDetails /> */}
            <Box sx={{ width: '100%', display: 'flex' }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#575757' }} component="div">
                  Delivery Methods:
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 15, color: '#575757' }} component="div">
                  Pickup
                </Typography>
              </Box>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16, color: '#575757' }} component="div">
                  Delivery Location:
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 15, color: '#575757' }} component="div">
                  No. 86, Araliya Uyana, Mattegoda
                </Typography>
              </Box>
            </Box>
          </CardContent>
          {/* <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', height: '100%' }}>
              <Button startIcon={<CheckCircleIcon />} size="large" variant="contained" color={'success'}>
                Accept
              </Button>
              <Button startIcon={<CancelIcon />} size="large" variant="outlined" color={'error'}>
                Reject
              </Button>
            </CardActions> */}
        </Card>
      </Grid>
    </Grid>
  );
};

export default function RequestProg() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <Grid md={12} container alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Grid md={6}>
        <PurchaseOrder selectedStep={selectedStep} setSelectedStep={(step) => setSelectedStep(step)} />
        {selectedStep === 0 ? <QuotationRequest item={null} setSelectedStep={(step) => setSelectedStep(step)} /> : <PurchaseOrderCard item={{ quantity: 20, price: 20 }} setSelectedStep={(step) => setSelectedStep(step)} progress={2} />}
      </Grid>
    </Grid>
  );
}
