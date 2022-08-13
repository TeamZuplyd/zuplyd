import React from 'react';
import Header from '../../components/header/header';
import { Grid } from '@mui/material';
import FormComponent from '../../components/form-component/form-component';
import ContactDetailsFormComponent from '../../components/contact-details-form-component/contact-details-form-component';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import BillingPage from '../../pages/company-admin/billingPage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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

function company() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Header title={'Dashboard'} />

      <div className="content">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Details" {...a11yProps(0)} />
            <Tab label="Plan & Billing" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FormComponent companyName="Zuplyd" companyAddress="" />

          <ContactDetailsFormComponent email="zuplyD@gmail.com" phoneNumbers={['0766811254', '0711478525']} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <BillingPage />
        </TabPanel>
      </div>
    </>
  );
}

export default company;
