/* eslint-disable-next-line */
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export interface SideOverProps {}

let counter: number = -1

const valueNames: any = [
  [
    ["Warehouse id ", "W0001 "],
    ["Location ", "Maththegoda "],
    ["Contact No ", "0771454789 "],
    ["Address ","No 35, Araliya Uyana, Maththegoda, 10230 "]
  ],

  [
    ["Name ", "Isuru Nishadha "],
    ["Contact No ", "0771454789 "],
    ["Email ","isurunishadha99@gmail.com "]
  ],

  [
    ["S0001 ", "Nugegoda "],
    ["S0002 ","Bambalapitiya "]
  ]
]

const valueTitles: any = ["Warehouse", "Manager Info", "Assigned shops"]

export function SideOver(props: SideOverProps) {

  const [rightSideNav, setrightSideNav] = React.useState(false);

  const toggleDrawer =
    ( open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setrightSideNav(!rightSideNav);
    };

  
  return (
    <>
    <React.Fragment key={"right"}>
        <Button onClick={toggleDrawer(true)} variant="contained" color="primary">button</Button>
        <Drawer
            anchor="right"
            open={rightSideNav}
            onClose={toggleDrawer(false)}
          >
          <Box
            sx={{ width: 350}}
            role="presentation"
            onKeyDown={toggleDrawer(false)}
          >

            {valueNames.map((names :any) =>{
                        return(
                            <div>
                                <Typography variant="h6" component="h2" sx={{ml:2, mb:2}}>
                                      {valueTitles[(counter = counter+1) % valueTitles.length]} 
                                  </Typography>
                           
                                  <Grid container rowGap={2} columnGap={2}>
                                      {names.map((nameItem:any) =>
                                        <>
                                            <Grid item xs={4} style={{wordBreak: "break-word", marginLeft: 15, color:"#595959"}}>{nameItem[0]}</Grid>
                                            <Grid item xs={5} style={{wordBreak: "break-word", marginLeft: "5px"}}>{nameItem[1]}</Grid>
                                          </>
                                      )}
                        
                                  </Grid>

                                  {valueNames.map((element:any) => {
                                    <>
                                        <h2 style={{marginLeft:15}}>{element[0]}</h2>
                                    </>
                                  })}

                                  <Divider sx={{mt: 2, mb:2}}/>
                            </div>
                        )}
            )}
          </Box>
          </Drawer>
      </React.Fragment>
    </>
  );
}

export default SideOver;
