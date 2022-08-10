import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../../components/header/header';
import CompanyAdminCard from '../../components/company-admin-card/company-admin-card';
import { TextField, Grid } from '@mui/material';
import {warehouses} from '../../../data/warehouse';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SupplyChain() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Header title={'Supply Chain'} />
      <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Warehouses" {...a11yProps(0)} />
            <Tab label="Shops" {...a11yProps(1)} />
            <Tab label="Hierarchy" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ ml: 2, mb: 2 }}
          />

          <Grid container rowGap={2}>
            {warehouses.map((warehouse) => (
              <Grid item>
                <CompanyAdminCard
                  name={warehouse['Manager Info']['Name']}
                  telephoneNumber={warehouse['Manager Info']['Contact No']}
                  warehouse={warehouse['Warehouse Info']['Warehouse ID']}
                  data={warehouse}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </>
  );
}
