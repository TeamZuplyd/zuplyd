import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useAuth0, User } from '@auth0/auth0-react';
import axios from 'axios';

// MUI
import { Container, Typography, Grid, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';

// Components
import InitLayout from '../../components/init-layout/init-layout';
import { GoBackButton, ContactNoButton } from '../../components/buttons/buttons';

const postData = {
  step: 1,
  comp_id: '',
  comp_data: null,
};

// const getCompId = () => {
//   return localStorage.getItem('comp_id') || '';
// };

const handleData = async ({ inputValues, numbers, userEmail }: any): Promise<any> => {
  // Registering company
  inputValues.contact_nums = numbers;
  // postData.comp_data = inputValues;
  // postData.comp_id = '';

  const response = await axios.post(`http://localhost:4321/api/shops/updateShop`, postData);

  return response;
};

function compInit1() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [numbers, setNumbers] = useState<string[]>([]);
  const [newNumber, setNewNumber] = useState('');

  // ------ Handling contact number ------

  const addNewPhoneNumber = () => {
    if (newNumber != '') {
      setNumbers([...numbers, newNumber]);
      setNewNumber('');
    }
  };

  const deleteNumber = (delNumber: any) => {
    let arr: string[] = [];

    for (let index = 0; index < numbers.length; index++) {
      if (numbers[index] != delNumber) {
        arr.push(numbers[index]);
      }
    }
    setNumbers(arr);
  };

  // ------EO Handling contact numbers ------

  //   const useCreateCompany = () => {
  //     return useMutation(createNewComp);
  //   };

  //   const { mutate: createCompany } = useCreateCompany();

  //   const handleCreateCompany = ({ inputValues, numbers, userEmail }: comp_data) => {
  //     createCompany({ inputValues, numbers, userEmail });
  //     navigate('/comp-init-2');
  //   };

  //   const compCreateMutation = useMutation(createNewComp);

  // Retriving email
  const auth = useAuth0();
  const userEmail = auth.user?.email;

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      address: '',
    },
  });
  const inputValues = methods.watch();

  async function handleContinue() {
    setLoading(true);
    let state = await handleData({ inputValues, numbers, userEmail });
    setLoading(false);
    if (state) navigate('/shop-manager');
    else {
      alert('Select an option');
    }

    // TODO: redirect if success only
  }
  return (
    <>
      {/* {loading && <span>Loading</span>} */}
      {!loading && (
        <InitLayout>
          <Grid className="init-container">
            <div className="size-mini">
              <Typography variant="h4" mb={6} align={'center'} sx={{ fontWeight: 700, fontSize: 40 }} className="init-title">
                Initialize shop details
              </Typography>

              <FormProvider {...methods}>
                <Grid container sx={{ minHeight: '380px', paddingBottom: '50px' }}>
                  <Grid container rowGap={5}>
                    {/* Comp Name Input */}
                    <Grid item xs={13}>
                      <TextField {...methods.register('name', { required: true })} label="Shop Name" variant="standard" sx={{ width: '100%' }} />
                    </Grid>

                    {/* Address Input */}
                    <Grid item xs={13}>
                      <TextField {...methods.register('address', { required: true })} id="address" label="Address" variant="standard" sx={{ width: '100%' }} />
                    </Grid>

                    {/* Contact No Input */}
                    <Grid item xs={numbers.length == 5 ? 12 : 10}>
                      <TextField id="standard-basic" label="Contact No" variant="standard" sx={{ width: '100%' }} onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
                    </Grid>

                    {numbers.length != 5 && (
                      <Grid item xs={2}>
                        <Button variant="contained" className="addNumber" style={{ alignSelf: 'right', width: '95%' }} onClick={addNewPhoneNumber}>
                          Add
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  <Grid container sx={{ minHeight: '70px' }}>
                    {numbers.map((no) => {
                      return (
                        <Grid item xs={3.3} sx={{ mt: 1 }}>
                          <ContactNoButton value={no} onClickFunc={deleteNumber} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <LoadingButton className="continueBtn" loading={loading} variant="contained" loadingPosition="end" fullWidth onClick={handleContinue} endIcon={<SendIcon />} sx={{ minHeight: '40px' }}>
                  Continue
                </LoadingButton>
              </FormProvider>
            </div>
          </Grid>
        </InitLayout>
      )}
    </>
  );
}

export default compInit1;
