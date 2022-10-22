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

// TODO: get comp id by email, can be null

const postData = {
  step: 1,
  comp_id: null,
  comp_data: null,
};

// type formValues = {
//   company_name: string;
//   address: string;
//   contactNums: [''];
// };

interface comp_data {
  inputValues: any;
  numbers: any;
  userEmail: any;
}

const createNewComp = async ({ inputValues, numbers, userEmail }: any): Promise<any> => {
  inputValues.contact_nums = numbers;
  postData.comp_data = inputValues;

  const response1 = await axios.post(`http://localhost:3333/api/companies/register`, postData);

  const userBody = {
    email: userEmail,
    role: 'comp_admin',
    company_name: inputValues.company_name,
    company_id: '',
  };

  userBody.company_id = response1.data.comp_id;

  const response2 = await axios.post(`http://localhost:7000/api/user-mgmt/register`, userBody);
  console.log(response1.data.comp_id);

  localStorage.setItem('comp_id', response1.data.comp_id);

  console.log('done');

  return response1 && response2;
};

function compInit1() {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      company_name: '',
      address: '',
    },
  });

  //   const useCreateCompany = () => {
  //     return useMutation(createNewComp);
  //   };

  //   const { mutate: createCompany } = useCreateCompany();

  //   const handleCreateCompany = ({ inputValues, numbers, userEmail }: comp_data) => {
  //     createCompany({ inputValues, numbers, userEmail });
  //     navigate('/comp-init-2');
  //   };

  //   const compCreateMutation = useMutation(createNewComp);
  const inputValues = methods.watch();
  //   const navigate = useNavigate();
  const [numbers, setNumbers] = useState<string[]>([]);
  const [newNumber, setNewNumber] = useState('');

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
  //   const auth = useAuth0();
  //   const userEmail = auth.user?.email;
  const [loading, setLoading] = React.useState(false);
  function handleContinue() {
    setLoading(true);
  }

  return (
    <>
      <InitLayout>
        <Grid className="init-container">
          {/* <Grid item xs={6} mb={3}>
            <GoBackBtn />
          </Grid> */}
          <div className="size-mini">
            <Typography variant="h4" mb={6} align={'center'} sx={{ fontWeight: 700, fontSize: 40 }} className="init-title">
              Tell us a bit about your company
            </Typography>

            <FormProvider {...methods}>
              <Grid container sx={{ minHeight: '380px', paddingBottom: '50px' }}>
                <Grid container rowGap={5}>
                  {/* Comp Name Input */}
                  <Grid item xs={13}>
                    <TextField {...methods.register('company_name', { required: true })} label="Company Name" variant="standard" sx={{ width: '100%' }} />
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
    </>
  );
}

export default compInit1;
