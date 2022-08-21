import { useState } from 'react';
import Header from '../../components/header/header';
import ItemCard from '../../components/item-card/item-card';
import { Tabs, Tab, Typography, Box, Grid, Card } from '@mui/material';
import { goodRequests as requests } from '../../../data/pmGoodRequests';
import { Container } from '@mui/system';

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
        <Box sx={{ py: 3, pr: 2 }}>
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
function goodRequests() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Header title="Good Requests" />
      <div className="content">
        <Box sx={{ width: '100%', paddingLeft: '2rem' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
              <Tab label="Received Requests" {...a11yProps(0)} />
              <Tab label="Assigned Requests" {...a11yProps(1)} />
            </Tabs>
          </Box>
          {/* Unassigned Requests */}
          <TabPanel value={value} index={0}>
            <UrgencyLevels />
            <Grid container spacing={2}>
              {requests
                .filter((request) => !request.assigned)
                .map((goodRequest) => {
                  return (
                    <Grid item>
                      <ItemCard key={goodRequest.id} item={goodRequest.item} quantity={goodRequest.quantity} urgencyLevel={goodRequest.urgencyLevel} requiredBy={goodRequest.requiredBy} assigned={goodRequest.assigned} warehouse={goodRequest.warehouse} />
                    </Grid>
                  );
                })}              
            </Grid>
          </TabPanel>

          {/* Assigned Requests */}
          <TabPanel value={value} index={1}>
            <UrgencyLevels />
            <Grid container spacing={2}>
              {requests
                .filter((request) => request.assigned)
                .map((goodRequest) => {
                  return (
                    <Grid item>
                      <ItemCard key={goodRequest.id} item={goodRequest.item} quantity={goodRequest.quantity} urgencyLevel={goodRequest.urgencyLevel} requiredBy={goodRequest.requiredBy} assigned={goodRequest.assigned} warehouse={goodRequest.warehouse} />
                    </Grid>
                  );
                })}
            </Grid>
          </TabPanel>
        </Box>
      </div>
    </>
  );
}

export default goodRequests;

const cardStyles = {
  width: '137px',
  height: '35px',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '1rem',
  marginRight: '1rem',
  color: 'white',
  fontSize: '18px',
};
const UrgencyLevels = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Card sx={{ backgroundColor: '#F60303' }} style={cardStyles}>
        <Typography variant="body2">Urgent</Typography>
      </Card>
      <Card sx={{ backgroundColor: '#FD8F02' }} style={cardStyles}>
        <Typography variant="body2">Moderate</Typography>
      </Card>
      <Card sx={{ backgroundColor: '#24CC08' }} style={cardStyles}>
        <Typography variant="body2">Normal</Typography>
      </Card>
    </div>
  );
};
