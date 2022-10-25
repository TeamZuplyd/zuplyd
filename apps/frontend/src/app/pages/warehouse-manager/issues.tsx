import { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import { Grid } from '@mui/material';
import FormComponent from '../../components/form-component/form-component';
import ContactDetailsFormComponent from '../../components/contact-details-form-component/contact-details-form-component';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import IssueForm from '../../components/issue-form/issue-form';
import IssueTable from '../../components/issue-table/issue-table';

import axios from 'axios';

const itemList = [
  {
    title: 'Banana Expired',
    batchNo: 'B1234',
    desc: 'Have given a bad batch of banana',
    actionTaken: 'Gave new batch of banana',
    actionDesc: 'Gave new batch of banana',
  },
  {
    title: 'Apple Expired',
    batchNo: 'A1234',
    desc: 'Have given a bad batch of Apple',
    actionTaken: 'Gave new batch of Apple',
    actionDesc: 'Gave new batch of banana',
  },
  {
    title: 'Mango Expired',
    batchNo: 'M1234',
    desc: 'Have given a bad batch of Mango',
    actionTaken: 'Gave new batch of Mango',
    actionDesc: 'Gave new batch of banana',
  },
];

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

function issues() {
  const [value, setValue] = useState(0);
  const [itemData, setItemData] = useState<any>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getRequestInfo = () => {
    const companyID = 'qwerty';
    const userID = 123;

    axios.get('http://localhost:5001/api/issues/userIssue/' + companyID + '/' + userID).then((res) => {
      setItemData(res.data);
    });
  };

  useEffect(() => {
    getRequestInfo();
  }, []);

  return (
    <>
      <Header title={'Issue'} />

      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Raise an issue" {...a11yProps(0)} />
              <Tab label="Sent issues" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <IssueForm />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <IssueTable itemData={itemData} />
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

export default issues;
