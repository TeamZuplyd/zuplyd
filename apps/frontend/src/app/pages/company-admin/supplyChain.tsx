import * as React from 'react';
import { TextField, Grid, Button, Tabs, Tab, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import axios from 'axios';
import CompanyAdminCard from '../../components/company-admin-card/company-admin-card';
import Header from '../../components/header/header';
import { CompanyHierarchy } from '../../components/company-hierarchy/company-hierarchy';

import { warehouses } from '../../../data/warehouse';
import { shops } from '../../../data/shop';
import { procurementManagers } from '../../../data/pm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

let warehouse = [
  {
    _id: '6358d852a885532728a30598',
    company_id: '6358d81729f842203326dd5f',
    location: '',
    manager_id: '6358d8521c0e2278b80b8aeb',
    contact_no: [],
    address: '',
    __v: 0,
  },
  {
    _id: '6358d853a885532728a3059a',
    company_id: '6358d81729f842203326dd5f',
    location: '',
    manager_id: '6358d8531c0e2278b80b8aef',
    contact_no: [],
    address: '',
    __v: 0,
  },
];

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

export default function SupplyChain() {
  let userData = localStorage.getItem('userData') || null;
  const company_id = userData ? JSON.parse(userData).company_id : '';
  // const company_id = '6305038955e694c59482fd9a';

  const [fetching, setFetching] = React.useState(true);
  const [warehouseData, setWarehouseData] = React.useState([]);
  const [shopData, setShopData] = React.useState([]);
  // const [warehouseData, setWarehouseData] = React.useState(null);

  async function getData(): Promise<void> {
    //fetching warehouse data
    let whData = await axios.get('http://localhost:1234/api/warehouses/findAll').then((result) => {
      setWarehouseData(result.data);
    });
    // let whData = await axios.get('http://localhost:1234/api/warehouses/findByCompany/' + company_id).then((result) => {
    //   setWarehouseData(result.data);
    // });
    // let whData = await axios
    //   .post('http://localhost:7000/api/user-mgmt/findAllByCompRole', {
    //     company_id: company_id,
    //     role: 'wh_mngr',
    //   })
    //   .then((result) => {
    //     setWarehouseData(result.data);
    //   });

    //fetching shop data
    // let shData = await axios.get('http://localhost:4321/api/shops/findByCompany/' + company_id, { responseType: 'json' }).then((result) => {
    //   setShopData(result.data['shop']);
    // });
    setFetching(false);

    // console.log(shopData);
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header title={'Supply Chain'} />
      <Box sx={{ width: '100%', paddingLeft: '2rem' }} className="content">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
            <Tab label="Warehouses" {...a11yProps(0)} />
            <Tab label="Shops" {...a11yProps(1)} />
            <Tab label="Procurement Managers" {...a11yProps(2)} />
            <Tab label="Hierarchy" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {/* warehouses tab */}
        <TabPanel value={value} index={0}>
          <SearchButton handleOpen={handleOpen} />
          <Grid container rowGap={2} columnGap={2}>
            {/* {warehouseData &&
              warehouseData.map((warehouse) => (
                <Grid item>
                  <CompanyAdminCard
                    name={warehouse['manager_id']}
                    telephoneNumber="322424"
                    //{warehouse['Manager Info']['Contact No']}
                    warehouse={warehouse['_id']}
                    // {warehouse['Warehouse Info']['Warehouse ID']}
                    data={warehouse}
                    title="Warehouse"
                  />
                </Grid>
              ))} */}
            {/* {warehouses.map((warehouse) => (
              <Grid item>
                <CompanyAdminCard name={warehouse['Manager Info']['Name']} telephoneNumber={warehouse['Manager Info']['Contact No']} warehouse={warehouse['Warehouse Info']['Warehouse ID']} data={warehouse} title="Warehouse" />
              </Grid>
            ))} */}
          </Grid>
          <ContainerModal open={open} handleClose={handleClose} title="Warehouse" />
        </TabPanel>

        {/* shops tab */}
        <TabPanel value={value} index={1}>
          <SearchButton handleOpen={handleOpen} />
          <Grid container rowGap={2} columnGap={2}>
            {shops.map((shop) => (
              <Grid item>
                <CompanyAdminCard name={shop['Manager Info']['Name']} telephoneNumber={shop['Manager Info']['Contact No']} warehouse={shop['Shop Info']['Shop ID']} data={shop} title="Shop" />
              </Grid>
            ))}
          </Grid>
          <ContainerModal open={open} handleClose={handleClose} title="Shop" />
        </TabPanel>

        {/* procurement managers tab */}
        <TabPanel value={value} index={2}>
          <SearchButton handleOpen={handleOpen} />
          <Grid container rowGap={2} columnGap={2}>
            {procurementManagers.map((procurementManager) => (
              <Grid item>
                <PMCard name={procurementManager['name']} telephoneNumber={procurementManager['telephone']} email={procurementManager['email']} />
              </Grid>
            ))}
          </Grid>
          <ContainerModal open={open} handleClose={handleClose} title="Procurement Manager" />
        </TabPanel>

        {/* Hierarchy tab */}
        <TabPanel value={value} index={3}>
          <CompanyHierarchy warehouseData={warehouseData} />
        </TabPanel>
      </Box>
    </>
  );
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 250,
  maxHeight: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
//modal component
type ContainerModalProps = {
  open: boolean;
  title: string;
  handleClose: () => void;
};

const ContainerModal = ({ open, title, handleClose }: ContainerModalProps) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" textAlign="center">
          Add New {title}
        </Typography>
        <form>
          <TextField id="Email" label={`Email of ${title} Manager`} variant="outlined" size="small" margin="dense" sx={{ mt: 4 }} fullWidth />
          <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{}}>
            <Button variant="contained" color="success" sx={{ mt: 4, mr: 4 }}>
              Send Email
            </Button>
            <Button variant="contained" color="warning" sx={{ mt: 4, mr: 'end' }} onClick={handleClose}>
              Discard
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
// search button component
const SearchButton = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <>
      <TextField size="small" id="outlined-basic" label="Search" variant="outlined" sx={{ ml: 2, mb: 2 }} />
      <Button variant="contained" color="primary" sx={{ ml: 2, mb: 2 }} onClick={handleOpen}>
        Add new
      </Button>
    </>
  );
};

type PMCardProps = {
  name: string;
  telephoneNumber: string;
  email: string;
};
const PMCard = ({ name, telephoneNumber, email }: PMCardProps) => {
  return (
    <Card sx={{ minWidth: 300, width: 300, maxHeight: 141, height: 141, ml: 2 }}>
      <CardContent sx={{ pl: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {name}
        </Typography>

        <Grid container sx={{ mt: 1 }} rowGap={2}>
          <Grid item xs={1.5}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ height: 18, marginRight: 10 }}>
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </Grid>

          <Grid item xs={8} style={{ wordBreak: 'break-word' }}>
            <Typography variant="body2">{email}</Typography>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 1 }}>
          <Grid item xs={1.5}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sideNav-icon" viewBox="0 0 20 20" fill="currentColor" style={{ height: 18, marginRight: 10 }}>
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </Grid>

          <Grid item xs={8} style={{ wordBreak: 'break-word' }}>
            <Typography variant="body2">{telephoneNumber}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
