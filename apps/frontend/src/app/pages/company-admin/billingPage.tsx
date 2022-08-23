import React from 'react';
import { Typography, Grid, Button, Card, CardContent, CardActionArea, ListItem, List } from '@mui/material';
import { useState } from 'react';

function billingPage() {
  const [selected, setSelected] = useState(0);

  const tier = [
    {
      id: 1,
      name: 'STARTER',
      price: 0,
      description: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
      chosenTier: true,
    },
    {
      id: 2,
      name: 'PLUS',
      price: 30000,
      description: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
      chosenTier: false,
    },
    {
      id: 3,
      name: 'PREMIUM',
      price: 50000,
      description: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
      chosenTier: false,
    },
  ];

  const handleSelected = (index: number) => {
    setSelected(index);
    console.log('selected ' + index);
  };

  return (
    <Grid>
      <Grid container item xs={12} alignItems="center" style={{}}>
        <Grid container item xs={12} direction="column" rowSpacing={1} style={{ maxWidth: '50%' }}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36, pb: 2 }} style={{ textAlign: 'center' }}>
              Plans we offer.
            </Typography>
          </Grid>

          <Grid item container spacing={2} justifyContent="space-between" alignItems="center" sx={{ width: 1000 }}>
            {tier.map((item, index) => {
              return (
                <Grid item xs={12} md={4}>
                  <TierItem id={tier[index].id} name={tier[index].name} price={tier[index].price} description={tier[index].description} handleSelect={handleSelected} selected={selected} chosenTier={item.chosenTier} />
                </Grid>
              );
            })}
          </Grid>

          <Button variant="contained" className="createAcc" style={{ width: '50%', marginTop: '5%', alignSelf: 'center' }}>
            Change plan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25', marginLeft: '20' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default billingPage;

type TierItemProps = {
  id: number;
  name: string;
  price: number;
  description: string[];
  handleSelect: (id: number) => void;
  selected: number;
  chosenTier: boolean;
};

function TierItem({ id, name, price, description, handleSelect, selected, chosenTier }: TierItemProps) {
  return (
    <Card style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} onClick={() => handleSelect(id)} className={selected === id ? 'highlightTier' : '' || chosenTier == true ? 'selectedTier' : ''}>
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
