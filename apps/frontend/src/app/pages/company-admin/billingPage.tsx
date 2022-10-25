import React from 'react';
import { Typography, Grid, Button, Card, CardContent, CardActionArea, ListItem, List } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import checkMark from '../../../assets/imgs/ic_check.png';

function billingPage() {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = React.useState(false);

  const tiers = [
    {
      id: 1,
      name: 'Starter',
      iconPath: '../../../assets/imgs/ic_plan_basic.png',
      price: 0,
      description: 'Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien.',
      points: ['Online operator 24/7', 'Online operator 24/7', 'Point 3', 'Point 4', 'Point 5'],
    },
    {
      id: 2,
      name: 'Plus',
      iconPath: '../../../assets/imgs/ic_plan_starter.png',
      price: 59,
      description: 'Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien.',
      points: ['Online operator 24/7', 'Online operator 24/7', 'Online operator 24/7', 'Point 4', 'Point 5'],
    },
    {
      id: 3,
      name: 'Premium',
      iconPath: '../../../assets/imgs/ic_plan_premium.png',
      price: 99,
      description: 'Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien.',
      points: ['Online operator 24/7', 'Online operator 24/7', 'Point 3', 'Point 4', 'Point 5'],
    },
  ];

  const handleSelected = (index: number) => {
    setSelected(index);
    console.log('selected ' + index);
  };

  async function handleContinue() {
    setLoading(true);
    // let state = await handleData(selected);
    setLoading(false);
    // TODO: redirect if success only
  }

  return (
    <Grid>
      <div className="size-large" style={{ padding: '40px', paddingTop: '50px', paddingRight: '70px' }}>
        <Grid container sx={{ minHeight: '380px', paddingBottom: '50px' }}>
          <Grid item container spacing={2} justifyContent="space-between" alignItems="center">
            {tiers.map((item, index) => {
              return (
                <Grid item xs={3.8}>
                  <PaymentPlan id={tiers[index].id} name={tiers[index].name} price={tiers[index].price} iconPath={tiers[index].iconPath} description={tiers[index].description} handleSelect={handleSelected} points={tiers[index].points} selected={selected} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <LoadingButton className="continueBtn" loading={loading} variant="contained" loadingPosition="end" onClick={handleContinue} sx={{ marginLeft: '25%', marginRight: 'auto', width: '50%', minHeight: '40px' }}>
          Change Plan
        </LoadingButton>
      </div>
    </Grid>
  );
}

export default billingPage;

type paymentPlanProps = {
  id: number;
  name: string;
  price: number;
  iconPath: string;
  description: string;
  handleSelect: (id: number) => void;
  selected: number;
  points: string[];
};

function PaymentPlan({ id, name, price, iconPath, description, handleSelect, points, selected }: paymentPlanProps) {
  return (
    <Card onClick={() => handleSelect(id)} className={selected === id ? 'tier payment highlightTier' : 'tier payment'}>
      <CardActionArea>
        <CardContent>
          <Grid container sx={{ p: '15px' }} xs={12}>
            <Grid container xs={7} direction="column">
              <Grid item>
                <span className="title">Zuplyd</span>
                <h4 className="spec-name">{name}</h4>
              </Grid>
              <Grid item sx={{ my: 2 }}>
                <span className="price">${price}</span>
                <span className="price-deco">/mo</span>
              </Grid>
            </Grid>
            <Grid container xs={5}>
              <img src={iconPath} alt="gg" style={{ alignSelf: 'right', height: 50, width: 50 }} />
            </Grid>
            <Grid item direction="column" xs={12}>
              <Typography sx={{ color: '#637381', mb: 2, fontWeight: 400, fontSize: '14px', lineHeight: '26px' }}>{description}</Typography>
              {points.map((item, index) => {
                return (
                  <Typography sx={{ my: 1.5, fontSize: 14 }} className="point">
                    <img src={checkMark} alt="gg" style={{ margin: '3px 8px 3px 0', marginRight: 8, height: 15, width: 15 }} />
                    {item}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
