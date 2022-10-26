import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useAuth0, User } from '@auth0/auth0-react';
import axios from 'axios';

// MUI
import { Container, Typography, Grid, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';

// Components
import InitLayout from '../../components/init-layout/init-layout';
import { GoBackButton, ContactNoButton } from '../../components/buttons/buttons';

import checkMark from '../../../assets/imgs/ic_check.png';

const postData = {
  step: 3,
  comp_id: '',
  comp_data: {},
};

const getCompId = () => {
  return localStorage.getItem('comp_id') || '';
};

const handleData = async (selectedTier: any): Promise<any> => {
  if (selectedTier == 0) {
    alert('Select an option');
    return null;
  } else {
    postData.comp_id = getCompId();
    postData.comp_data = { tier: selectedTier };
    const response = await axios.post(`http://localhost:2525/api/companies/register`, postData);
    return response;
  }
};

function compInit3() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const [selected, setSelected] = useState(0);

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
  };

  async function handleContinue() {
    setLoading(true);
    let state = await handleData(selected);
    setLoading(false);
    // TODO: redirect if success only
    navigate('/comp-init-4');
  }

  return (
    <>
      <InitLayout>
        <Grid className="init-container">
          {/* <Grid item xs={6} mb={3}>
            <GoBackButton />
          </Grid> */}
          <div className="size-large">
            <Typography variant="h4" mb={6} align={'center'} sx={{ fontWeight: 700, fontSize: 40 }} className="init-title">
              Choose your preffered plan
            </Typography>

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
            <LoadingButton className="continueBtn" loading={loading} variant="contained" loadingPosition="end" onClick={handleContinue} endIcon={<SendIcon />} sx={{ marginLeft: '25%', marginRight: 'auto', width: '50%', minHeight: '40px' }}>
              Continue
            </LoadingButton>
          </div>
        </Grid>
      </InitLayout>
    </>
  );
}

export default compInit3;

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
