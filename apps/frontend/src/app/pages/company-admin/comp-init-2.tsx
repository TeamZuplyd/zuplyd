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

// Components
import InitLayout from '../../components/init-layout/init-layout';
import { GoBackButton, ContactNoButton } from '../../components/buttons/buttons';

// TODO: get comp id by email, can be null

const postData = {
  step: 1,
  comp_id: null,
  comp_data: null,
};

// type formValues = {
//   company_name: string;
//   address: string;
//   contactNums: [''];
// };

interface comp_data {
  inputValues: any;
  numbers: any;
  userEmail: any;
}

const createNewComp = async ({ inputValues, numbers, userEmail }: any): Promise<any> => {
  inputValues.contact_nums = numbers;
  postData.comp_data = inputValues;

  const response1 = await axios.post(`http://localhost:3333/api/companies/register`, postData);

  const userBody = {
    email: userEmail,
    role: 'comp_admin',
    company_name: inputValues.company_name,
    company_id: '',
  };

  userBody.company_id = response1.data.comp_id;

  const response2 = await axios.post(`http://localhost:7000/api/user-mgmt/register`, userBody);
  console.log(response1.data.comp_id);

  localStorage.setItem('comp_id', response1.data.comp_id);

  console.log('done');

  return response1 && response2;
};

function compInit2() {
  const [loading, setLoading] = React.useState(false);
  function handleContinue() {
    setLoading(true);
  }

  const [selected, setSelected] = useState(0);
  const distributionStructure = [
    {
      id: 1,
      name: 'Centralized',
      description: 'A single top level warehouse collects goods from suppliers and distributes to other warehouses',
      img: '../../assets/imgs/c.png',
    },
    {
      id: 2,
      name: 'Distributed',
      description: 'A single top level warehouse collects goods from suppliers and distributes to other warehouses',
      img: '../../assets/imgs/c.png',
    },
  ];
  const handleSelected = (index: number) => {
    setSelected(index);
  };
  return (
    <>
      <InitLayout>
        <Grid className="init-container">
          {/* <Grid item xs={6} mb={3}>
            <GoBackButton />
          </Grid> */}
          <div className="size-mini">
            <Typography variant="h4" mb={6} align={'center'} sx={{ fontWeight: 700, fontSize: 40 }} className="init-title">
              Select the distribution structure
            </Typography>

            <Grid container sx={{ minHeight: '380px', paddingBottom: '50px' }}>
              <Grid item container spacing={2} justifyContent="space-between" alignItems="center" direction="column">
                {distributionStructure.map((item, index) => {
                  return (
                    <Grid item xs={6}>
                      <DistributionStructure id={distributionStructure[index].id} name={distributionStructure[index].name} description={distributionStructure[index].description} img={distributionStructure[index].img} handleSelect={handleSelected} selected={selected} />
                    </Grid>
                  );
                })}
              </Grid>

              {/* {distributionStructure.map((item, index) => {
                return (
                  <Grid item xs={6}>
                    <DistributionStructure id={distributionStructure[index].id} name={distributionStructure[index].name} description={distributionStructure[index].description} img={distributionStructure[index].img} handleSelect={handleSelected} selected={selected} />
                  </Grid>
                );
              })} */}
              <Grid container rowGap={5}></Grid>
              {/* <Grid container sx={{ minHeight: '70px' }}></Grid> */}
            </Grid>
            <LoadingButton className="continueBtn" loading={loading} variant="contained" loadingPosition="end" fullWidth onClick={handleContinue} endIcon={<SendIcon />} sx={{ minHeight: '40px' }}>
              Continue
            </LoadingButton>
          </div>
        </Grid>
      </InitLayout>
    </>
  );
}

export default compInit2;

type distributionStructureProps = {
  id: number;
  name: string;
  description: string;
  img: string;
  handleSelect: (id: number) => void;
  selected: number;
};

function DistributionStructure({ id, name, description, img, handleSelect, selected }: distributionStructureProps) {
  return (
    <Card sx={{ maxWidth: '100%' }} onClick={() => handleSelect(id)} className={selected === id ? 'tier highlightTier' : 'tier'}>
      <CardActionArea>
        <CardContent sx={{ p: 3 }}>
          <Grid container xs={12}>
            <Grid item direction="column" xs={4}>
              <img src={img} alt="" style={{ width: 100 }} />
            </Grid>

            <Grid item direction="column" xs={8}>
              <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: 20 }}>
                {name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
