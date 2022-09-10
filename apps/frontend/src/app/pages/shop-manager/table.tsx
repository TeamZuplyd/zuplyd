import { CardContent } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { items } from '../../../data/items';
import CustomTable from '../../components/custom-table/custom-table';
import Header from '../../components/header/header';
import axios from 'axios';

const table = () => {
  const [itemInfo, setItemInfo] = React.useState<any>([]);

  // const getItemInfo = () => {
  //   axios.get('http://localhost:7000/api/procurement/item/findAll').then((res) => {
  //     setItemInfo(res.data.items);
  //     console.log(res.data.items);
  //   });
  // };

  // React.useEffect(() => {
  //   getItemInfo();
  // }, []);

  const { id } = useParams();
  let data = items.filter((item) => id !== undefined && item.category.toLowerCase() === id.toLowerCase());
  return (
    <>
      <Header title="Inventory" />
      <div className="content">
        <CustomTable headerNames={['Name', 'Minimum Limit', 'Maximum Limit', 'Brand', 'Available Units', 'More Info', 'Reorder']} rows={data} />
      </div>
    </>
  );
};

export default table;
// {/* <CustomTable headerNames={['Name', 'Minimum Limit', 'Maximum Limit', 'Brand', 'Available Units', 'More Info', 'Reorder']} /> */}
