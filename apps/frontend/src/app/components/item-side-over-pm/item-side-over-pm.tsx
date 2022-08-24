/* eslint-disable-next-line */
import * as React from 'react';
import { Typography, Drawer, Box, Button, Grid } from '@mui/material';
import { formatColumnHeader } from '../../../util/stringMethods';

export interface ItemSideOverPMProps {
  toggle: boolean;
  toggleDrawer: any;
  data: any;
  index?: number;
}

export function ItemSideOverPM({ toggle, toggleDrawer, data, index }: ItemSideOverPMProps) {
  return (
    <React.Fragment key={'right'}>
      <Drawer anchor="right" open={toggle} onClose={toggleDrawer(toggle)}>
        <Box sx={{ width: 350, p: 3, height: '100%' }} role="presentation" onKeyDown={toggleDrawer(toggle)}>
          <Typography variant="h4" sx={{ textAlign: 'center', mx: 'auto' }}>
            {data.name}
          </Typography>
          <Grid container direction="row" spacing={3} columnGap={0} sx={{ pt: 3, margin: 'auto' }}>
            {Object.keys(data)
              .filter((key) => key != '_id' && key != '__v')
              .map((key) => {
                return (
                  <>
                    {key != 'attributes_array' ? (
                      <>
                        <Grid item xs={6}>
                          {formatColumnHeader(key)}
                        </Grid>

                        <Grid item xs={6}>
                          {data[key]}
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6" sx={{ mt: 5, pl: 3 }}>
                          Other Attributes
                        </Typography>
                        {data[key].map((data2) => {
                          return (
                            <Grid item xs={12}>
                              {data2}
                            </Grid>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
          </Grid>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default ItemSideOverPM;
