import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const postData = {
  step: 2,
  comp_id: '',
  comp_data: {},
};

const getCompId = () => {
  return localStorage.getItem('comp_id') || '';
};

const selectDistStruct = async (selectedStruct: any) => {
  if (selectedStruct == 0) {
    alert('Select an option');
    return null;
  } else {
    postData.comp_data = { distribution_struct: selectedStruct };
    postData.comp_id = getCompId();

    const response = await axios.post(`http://localhost:3333/api/companies/register`, postData);
    return response;
  }
};

function regPage3() {
  const navigate = useNavigate();
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

  const handleInit2 = async () => {
    let res = await selectDistStruct(selected);
    if (res) navigate('/comp-init-3');
  };

  return (
    <form>
      <Grid container rowGap={0} columnGap={0}>
        <Grid container item xs={6} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid container item xs={6} direction="column" rowSpacing={2} style={{ maxWidth: '50%' }}>
            <Grid item xs={6}>
              <Button onClick={() => navigate('/comp-init-1', { replace: true })} variant="contained" className="goBack" style={{ width: '30%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Go Back
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36 }}>
                Select the distribution structure.
              </Typography>
            </Grid>

            <Grid item container spacing={2} justifyContent="space-between" alignItems="center" direction="column">
              {distributionStructure.map((item, index) => {
                return (
                  <Grid item xs={6}>
                    <DistributionStructure id={distributionStructure[index].id} name={distributionStructure[index].name} description={distributionStructure[index].description} img={distributionStructure[index].img} handleSelect={handleSelected} selected={selected} />
                  </Grid>
                );
              })}
            </Grid>
            {/* <Link to="/comp-init-3"> */}
            <Button
              variant="contained"
              className="createAcc"
              style={{ width: '100%', marginTop: '20%' }}
              onClick={() => {
                handleInit2();
              }}
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25', marginLeft: '20' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            {/* </Link> */}
          </Grid>
        </Grid>

        <Grid container item xs={6} alignItems="center" justifyContent="center" style={{ backgroundColor: '#DBDBDB' }}>
          <Grid item xs={6}>
            <img src="../../assets/svg/ca-p2.svg" alt="" style={{ width: 500 }} />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default regPage3;

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
    <Card sx={{ maxWidth: '100%' }} onClick={() => handleSelect(id)} className={selected === id ? 'highlightTier' : ''}>
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
