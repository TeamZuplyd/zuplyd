import { Typography, Grid, Button, Card, CardContent, CardActionArea, ListItem, List } from '@mui/material';

import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// TODO: get comp id by email, can be null
const compId = null;
// const compId = '62f7517c8d8d6a1689cd1b6d';

const postData = {
  step: 3,
  comp_id: null,
  comp_data: {},
};

const selectTier = async (selectedTier: any) => {
  if (selectedTier == 0) {
    alert('Select an option');
    return null;
  } else {
    postData.comp_data = { tier: selectedTier };
    const response = await axios.post(`http://localhost:3333/api/companies/register`, postData);
    return response;
  }
};

const RegPage4 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const tier = [
    {
      id: 1,
      name: 'STARTER',
      price: 0,
      description: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
    },
    {
      id: 2,
      name: 'PLUS',
      price: 30000,
      description: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
    },
    {
      id: 3,
      name: 'PREMIUM',
      price: 50000,
      description: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
    },
  ];

  const handleSelected = (index: number) => {
    setSelected(index);
    // console.log('selected ' + index);
  };

  const handleInit3 = async () => {
    let res = await selectTier(selected);
    if (res) navigate('/comp-init-4');
  };

  return (
    <Grid>
      <Grid container item xs={12} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid container item xs={12} direction="column" rowSpacing={1} style={{ maxWidth: '50%' }}>
          <Grid item xs={12}>
            <Link to="/comp-init-2">
              <Button variant="contained" className="goBack" style={{ width: '30%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Go Back
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36, pb: 2 }} style={{ textAlign: 'center' }}>
              Choose your preferred plan.
            </Typography>
          </Grid>

          <Grid item container spacing={2} justifyContent="space-between" alignItems="center">
            {tier.map((item, index) => {
              return (
                <Grid item xs={12} md={4}>
                  <TierItem id={tier[index].id} name={tier[index].name} price={tier[index].price} description={tier[index].description} handleSelect={handleSelected} selected={selected} />
                </Grid>
              );
            })}
          </Grid>

          {/* <Link to="/comp-init-4"> */}
          <Button
            // onClick={validateData}
            variant="contained"
            className="createAcc"
            style={{ width: '50%', marginTop: '5%', alignSelf: 'center' }}
            onClick={() => {
              if (!compId) {
                handleInit3();
              }
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
    </Grid>
  );
};
export default RegPage4;

type TierItemProps = {
  id: number;
  name: string;
  price: number;
  description: string[];
  handleSelect: (id: number) => void;
  selected: number;
};

function TierItem({ id, name, price, description, handleSelect, selected }: TierItemProps) {
  return (
    <Card onClick={() => handleSelect(id)} className={selected === id ? 'highlightTier' : ''}>
      <CardActionArea>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="subtitle1" sx={{ color: '#1F2937' }}>
            Zuplyd <span className="tier">{name}</span>
          </Typography>

          <Typography variant="h6" textAlign="center">
            <Typography variant="caption">
              <span style={{ verticalAlign: 'super' }}>LKR </span>
            </Typography>
            {price}
            <Typography variant="caption">
              <span> /mo</span>
            </Typography>
          </Typography>
          <Typography variant="body1" className="tierPoints" textAlign="left">
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              {description.map((item, index) => {
                return (
                  <ListItem sx={{ display: 'list-item', pl: 0 }} key={index}>
                    {item}
                  </ListItem>
                );
              })}
            </List>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
