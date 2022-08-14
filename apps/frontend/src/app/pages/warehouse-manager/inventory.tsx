import React from 'react';
import { Grid } from '@mui/material';
import CategoryCard from '../../components/category-card/category-card';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import { categories } from '../../../data/categories';
function inventory() {
  return (
    <div>
      <Header title={'Inventory'} />
      <Grid container sx={{}} rowGap={0} spacing={2}>
        {categories.map((category: string) => (
          <Grid item>
            <Link to={category}>
              <CategoryCard name={category} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default inventory;
