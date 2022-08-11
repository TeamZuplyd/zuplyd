/* eslint-disable-next-line */
import * as React from 'react';
import { Typography, Drawer, Box, Grid, Divider } from '@mui/material';
export interface SideOverProps {
  toggle: boolean;
  toggleDrawer: any;
  data: any;
}

export function SideOver({ toggle, toggleDrawer, data }: SideOverProps) {
  return (
    <React.Fragment key={'right'}>
      {/* <Button onClick={toggleDrawer(toggle)} variant="contained" color="primary">button</Button> */}
      <Drawer anchor="right" open={toggle} onClose={toggleDrawer(toggle)}>
        <Box
          sx={{ width: 350 }}
          role="presentation"
          onKeyDown={toggleDrawer(toggle)}
        >
          {Object.keys(data).map((key) => {
            const value = data[key];

            return (
              <>
                <Divider sx={{ mt: 2, mb: 2 }} />

                <Typography variant="h6" component="h2" sx={{ ml: 2, mb: 2 }}>
                  {key}
                </Typography>

                {Object.keys(value).map((k) => {
                  return (
                    <Grid container rowGap={2} columnGap={2}>
                      <Grid
                        item
                        xs={4}
                        style={{
                          wordBreak: 'break-word',
                          marginLeft: 15,
                          marginBottom: 10,
                          color: '#595959',
                        }}
                      >
                        {k}
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        style={{ wordBreak: 'break-word', marginLeft: '5px' }}
                      >
                        {value[k]}
                      </Grid>
                    </Grid>
                  );
                })}
              </>
            );
          })}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default SideOver;
