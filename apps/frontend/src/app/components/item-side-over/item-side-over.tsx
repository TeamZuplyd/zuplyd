/* eslint-disable-next-line */
import * as React from 'react';
import { Typography, Drawer, Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';

export interface ItemSideOverProps {
  toggle: boolean;
  toggleDrawer: any;
  data: any;
  index?: number;
}

export function ItemSideOver({ toggle, toggleDrawer, data, index }: ItemSideOverProps) {
  const managing_id = 'qwerty'; //owner_id
  // const managing_id = JSON.parse(localStorage.getItem('userData') || '').managing_id;
  const [item, setItem] = React.useState({ item_code: data._id, item_name: data.item_name, shop_id: managing_id, min: 0, max: 0 });

  React.useEffect(() => {
    setItem({ ...item, item_code: data._id, item_name: data.item_name, shop_id: managing_id, max: data.max, min: data.min });
  }, [data]);

  const [inputState, setInputState] = React.useState(true);
  const changeInputState = () => {
    setInputState(!inputState);
  };

  const handleClick = async () => {
    let res;
    try {
      if (data.min || data.max) {
        res = await axios.post('http://localhost:4321/api/shops/updateItem' + '/' + item.item_code, item);
      } else {
        res = await axios.post('http://localhost:4321/api/shops/createItem', item);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(item);
  return (
    <React.Fragment key={'right'}>
      <Drawer anchor="right" open={toggle} onClose={toggleDrawer(toggle)}>
        <Box sx={{ width: 350, p: 3, height: '100%' }} role="presentation" onKeyDown={toggleDrawer(toggle)}>
          <Typography variant="h5" sx={{ textAlign: 'center', mx: 'auto' }}>
            {data.item_name}
          </Typography>
          <Grid container direction="row" spacing={3} columnGap={0} sx={{ pt: 3, margin: 'auto' }}>
            {Object.keys(data)
              .filter((key) => key !== '_id' && key !== '__v' && key !== 'min' && key !== 'max')
              .map((key) => {
                return (
                  <>
                    <Grid item xs={6}>
                      {key}
                    </Grid>
                    <Grid item xs={6}>
                      {data[key]}
                    </Grid>
                  </>
                );
              })}
            <Grid item xs={6}>
              Minimum Limit
            </Grid>
            <Grid item xs={6}>
              <TextField type="number" id="outlined-basic" value={item.min ? item.min : 0} onChange={(e) => setItem({ ...item, min: parseInt(e.target.value) })} disabled={inputState} variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              Maximum Limit
            </Grid>
            <Grid item xs={6}>
              <TextField type="number" id="outlined-basic" value={item.max ? item.max : 0} onChange={(e) => setItem({ ...item, max: parseInt(e.target.value) })} disabled={inputState} variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" sx={{ backgroundColor: '#9ca3af', mb: 2 }} onClick={changeInputState}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{
                      height: '15px',
                      width: '20px',
                      marginRight: '8px',
                    }}
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </div>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="success" sx={{ mb: 2 }} onClick={handleClick}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default ItemSideOver;
