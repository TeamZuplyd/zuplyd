import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// MUI
import { Typography, Grid, Box, Button, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

// Components
import EmailList from '../../components/email-list/email-list';
import InitialAddForm from '../../components/initial-add-form/initial-add-form';
import InitLayout from '../../components/init-layout/init-layout';
import { GoBackButton, ContactNoButton } from '../../components/buttons/buttons';

// TODO: check if we shud destroy comp_id in localStorage
type Props = {};
const postData = {
  step: 4,
  comp_id: '',
  comp_data: {},
};

const getCompId = () => {
  return localStorage.getItem('comp_id') || '';
};

interface comp_data {
  p_managers: any;
  w_managers: any;
  s_managers: any;
}

const postManagers = async ({ p_managers, w_managers, s_managers }: comp_data): Promise<any> => {
  // setTimeout(async (): Promise<any> => {
  postData.comp_id = getCompId();
  postData.comp_data = {
    p_managers: p_managers,
    w_managers: w_managers,
    s_managers: s_managers,
  };

  const response1 = await axios.post(`http://localhost:3333/api/companies/register`, postData);

  const mangBody = {
    company_id: getCompId(),
    w_managers: w_managers,
    s_managers: s_managers,
    p_managers: p_managers,
  };
  const response2 = await axios.post(`http://localhost:3333/api/companies/setupManagers`, mangBody);

  console.log('done');

  return response1 && response2;
  // }, 3000);
};

const compInit4 = (props: Props) => {
  const navigate = useNavigate();
  const [isPosting, setPosting] = useState(false);
  const [s_managers, setShopManagerEmails] = useState<string[]>([]);
  const [w_managers, setWarehouseManagerEmails] = useState<string[]>([]);
  const [p_managers, setProcurementManagerEmails] = useState<string[]>([]);

  const addShopManagerEmail = (email: string) => {
    setShopManagerEmails([...s_managers, email]);
  };

  const addWarehouseManagerEmail = (email: string) => {
    setWarehouseManagerEmails([...w_managers, email]);
  };

  const addProcurementManagerEmail = (email: string) => {
    setProcurementManagerEmails([...p_managers, email]);
  };

  const deleteShopManagerEmail = (index: number) => {
    // console.log('delete ' + index);
    setShopManagerEmails((s_managers) => s_managers.filter((_, i) => i !== index));
    // console.log('delete ' + index);
  };

  const deleteWarehouseManagerEmail = (index: number) => {
    setWarehouseManagerEmails((w_managers) => w_managers.filter((_, i) => i !== index));
  };

  const deleteProcurementManagerEmail = (index: number) => {
    setProcurementManagerEmails((p_managers) => p_managers.filter((_, i) => i !== index));
  };

  const handleInit4 = async () => {
    setPosting(true);
    // let res = await postManagers({ p_managers, w_managers, s_managers });
    postManagers({ p_managers, w_managers, s_managers })
      .then((data) => {
        setPosting(false);
      })
      .then(() => {
        console.log('Navigates');
        navigate('/company-admin');
      });

    // if (res) navigate('/company-admin/dashboard');
  };

  useEffect(() => {
    console.log('isPosting', isPosting);
  }, [isPosting]);

  const [loading, setLoading] = React.useState(false);
  function handleContinue() {
    setLoading(true);
  }

  return (
    <>
      <InitLayout>
        <Grid className="init-container">
          <div className="size-large">
            <Typography variant="h4" mb={6} align={'center'} sx={{ fontWeight: 700, fontSize: 40 }} className="init-title">
              Add procurement, warehouse & shop managers
            </Typography>

            <Grid container sx={{ minHeight: '380px', paddingBottom: '50px' }}>
              <Grid item container spacing={2} justifyContent="space-between" alignItems="center">
                <Grid item xs={3.8}>
                  <Card className="mang-container">
                    <CardContent>
                      <Grid container sx={{ p: '15px' }} xs={12}>
                        <Grid container xs={7} direction="column">
                          <Grid item>
                            <span className="spec-name">Procurement</span>
                            <span className="mang-span">Managers</span>
                          </Grid>
                        </Grid>
                        <Grid item direction="column" xs={12}>
                          <Grid item>
                            <InitialAddForm addEmail={addProcurementManagerEmail} />
                            <EmailList emails={p_managers} handleDelete={deleteProcurementManagerEmail} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3.8}>
                  <Card className="mang-container">
                    <CardContent>
                      <Grid container sx={{ p: '15px' }} xs={12}>
                        <Grid container xs={7} direction="column">
                          <Grid item>
                            <span className="spec-name">Warehouse</span>
                            <span className="mang-span">Managers</span>
                          </Grid>
                        </Grid>
                        <Grid item direction="column" xs={12}>
                          <Grid item>
                            <InitialAddForm addEmail={addWarehouseManagerEmail} />
                            <EmailList emails={w_managers} handleDelete={deleteWarehouseManagerEmail} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3.8}>
                  <Card className="mang-container">
                    <CardContent>
                      <Grid container sx={{ p: '15px' }} xs={12}>
                        <Grid container xs={7} direction="column">
                          <Grid item>
                            <span className="spec-name">Shop</span>
                            <span className="mang-span">Managers</span>
                          </Grid>
                        </Grid>
                        <Grid item direction="column" xs={12}>
                          <Grid item>
                            <InitialAddForm addEmail={addShopManagerEmail} />
                            <EmailList emails={s_managers} handleDelete={deleteShopManagerEmail} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <LoadingButton className="continueBtn" loading={loading} variant="contained" loadingPosition="end" onClick={handleContinue} endIcon={<SendIcon />} sx={{ marginLeft: '25%', marginRight: 'auto', width: '50%', minHeight: '40px' }}>
              Continue
            </LoadingButton>
          </div>
        </Grid>
      </InitLayout>
    </>
  );
};
export default compInit4;
