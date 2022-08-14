/* eslint-disable-next-line */
import * as React from 'react';
import { Typography, Drawer, Box, Button, Grid } from '@mui/material';

export interface ItemSideOverProps {
  toggle: boolean;
  toggleDrawer: any;
  data: any;
  index?: number;
}

export function ItemSideOver({ toggle, toggleDrawer, data, index }: ItemSideOverProps) {
  return (
    <React.Fragment key={'right'}>
      <Drawer anchor="right" open={toggle} onClose={toggleDrawer(toggle)}>
        <Box sx={{ width: 350, p: 3, height: '100%' }} role="presentation" onKeyDown={toggleDrawer(toggle)}>
          <Typography variant="h4" sx={{ textAlign: 'center', mx: 'auto' }}>
            {data.name}
          </Typography>
          <Grid container direction="row" spacing={3} columnGap={0} sx={{ pt: 3, margin: 'auto' }}>
            {Object.keys(data).map((key) => {
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
            <Grid item xs={12} textAlign="center">
              <Button variant='contained' color='success'>Reorder</Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default ItemSideOver;
