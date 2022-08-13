/* eslint-disable-next-line */
import * as React from 'react';
import { Typography, Drawer, Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

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
        <Box sx={{ width: 350, p: 3, height: '100%', backgroundColor: '#F3F4F6;' }} role="presentation" onKeyDown={toggleDrawer(toggle)}>
          <Typography variant="h5" sx={{ textAlign: 'center', mx: 'auto' }}>
            {data.name}
          </Typography>
          <TableContainer component={Paper} sx={{mt:3}}>
            <Table aria-label="simple table" size="small">
              <TableBody>
                {Object.keys(data).map((key) => {
                  return (
                    <>
                      {/* <h1>
                  {key} : {data[key]}
                </h1> */}

                      {/* {rows.map((row) => ( */}
                      <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th">
                          {key}
                        </TableCell>
                        <TableCell >
                          {data[key]}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default ItemSideOver;
