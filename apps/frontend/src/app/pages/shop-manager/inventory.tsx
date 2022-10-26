import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CategoryCard from '../../components/category-card/category-card';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import axios from 'axios';

function inventory() {
  const [categories, setCategories] = useState<any>([]);
  // TODO: get company ID from the local storage
  const companyID = 'qwerty';
  const getCategories = () => {
    axios.get('http://localhost:7000/api/procurement/item-category/findByCompanyID/'+ companyID).then((res) => {
      setCategories(res.data.itemCategory.categoryArr);
      console.log(res.data.itemCategory.categoryArr);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Header title={'Inventory'} />
      <Grid container rowGap={0} spacing={2} sx={{ width: '100%', paddingLeft: '2rem', marginTop: 2 }}>
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
