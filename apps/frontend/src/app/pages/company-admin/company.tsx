import React from 'react';
import Header from '../../components/header/header';
import { Grid } from '@mui/material';
import FormComponent from '../../components/form-component/form-component';
import ContactDetailsFormComponent from '../../components/contact-details-form-component/contact-details-form-component';
import { useAuth0, User } from '@auth0/auth0-react';
import axios from 'axios';

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

interface company {
  company_name: string;
  address: string;
  contact_nums: string[];
  w_managers: string[];
  s_managers: string[];
  p_managers: string[];
  init_completed: boolean;
  distribution_struct: number;
  tier: number;
}
//Fetching data

function company() {
  const [fetching, setFetching] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [companyData, setCompanyData] = React.useState(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function getData(email: any): Promise<void> {
    console.log('serching', email);

    let compData = await axios
      .get('http://localhost:3333/api/companies/findByMail/' + email, { responseType: 'json' })
      .then((result) => {
        console.log(result.data);
        setCompanyData(result.data);
      })
      .catch((err) => {});
    // console.log(compData.data);
    setFetching(false);
    // return compData.data;
  }

  // Retrieving email
  const auth = useAuth0();
  const userEmail = auth.user?.email || '2019cs041@stu.ucsc.cmb.ac.lk';

  React.useEffect(() => {
    getData(userEmail);
  }, []);

  return (
    <>
      <Header title={'Company'} />

      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="Plan & Billing" {...a11yProps(1)} />
            </Tabs>
          </Box>
          {fetching && <p>Fetching...</p>}
          {!fetching && (
            <>
              <TabPanel value={value} index={0}>
                <FormComponent companyName={companyData && companyData['company_name']} companyAddress={companyData && companyData['address']} />

                <ContactDetailsFormComponent email={companyData && companyData['email']} phoneNumbers={companyData && companyData['contact_nums']} />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <BillingPage />
              </TabPanel>
            </>
          )}
        </Box>
      </div>
    </>
  );
}

export default company;
