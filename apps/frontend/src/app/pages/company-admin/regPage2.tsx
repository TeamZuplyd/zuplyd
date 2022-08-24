import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { useAuth0, User } from '@auth0/auth0-react';

// TODO: get comp id by email, can be null

const postData = {
  step: 1,
  comp_id: null,
  comp_data: null,
};

type formValues = {
  company_name: string;
  address: string;
  contactNums: [''];
};

interface comp_data {
  inputValues: any;
  numbers: any;
  userEmail: any;
}

const createNewComp = async ({ inputValues, numbers, userEmail }: comp_data): Promise<any> => {
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

function regPage2() {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      company_name: '',
      address: '',
    },
  });

  const useCreateCompany = () => {
    return useMutation(createNewComp);
  };

  const { mutate: createCompany } = useCreateCompany();

  const handleCreateCompany = ({ inputValues, numbers, userEmail }: comp_data) => {
    createCompany({ inputValues, numbers, userEmail });
    navigate('/comp-init-2');
  };

  const compCreateMutation = useMutation(createNewComp);
  const inputValues = methods.watch();
  const navigate = useNavigate();
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
  const auth = useAuth0();
  const userEmail = auth.user?.email;

  return (
    <Grid container rowGap={0} columnGap={0}>
      <Grid container item xs={6} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid container item xs={6} direction="column" rowSpacing={2} style={{ maxWidth: '50%' }}>
          <Grid item xs={6}>
            <Button variant="contained" className="goBack" style={{ width: '30%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Go Back
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h4" sx={{ fontWeight: 500, fontSize: 36 }}>
              Tell us a bit about your company.
            </Typography>
          </Grid>

          <FormProvider {...methods}>
            <Grid container item xs={13}>
              <Grid item xs={13}>
                <TextField {...methods.register('company_name', { required: true })} id="name" label="Company Name" variant="standard" sx={{ mt: 5, width: '100%' }} />
              </Grid>

              <Grid item xs={13}>
                <TextField {...methods.register('address', { required: true })} id="address" label="Address" variant="standard" sx={{ mt: 3, width: '100%' }} />
              </Grid>
            </Grid>

            <Grid container item xs={13} sx={{ mt: 3 }}>
              <Grid item xs={numbers.length == 5 ? 12 : 10}>
                <TextField id="standard-basic" label="Contact No" variant="standard" sx={{ width: '100%' }} onChange={(e) => setNewNumber(e.target.value)} value={newNumber} />
              </Grid>

              {numbers.length != 5 ? (
                <Grid item xs={2}>
                  <Button variant="contained" className="addNumber" style={{ width: '100%' }} onClick={addNewPhoneNumber}>
                    Add
                  </Button>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>

            <Grid container item xs={12} sx={{ mt: 1 }}>
              {numbers.map((no) => {
                return (
                  <Grid item xs={4} sx={{ mt: 0.8 }}>
                    <span className="phoneNumberSpan">
                      {no}
                      <button className="spanBtn" onClick={() => deleteNumber(no)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '20', marginLeft: '10' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  </Grid>
                );
              })}
            </Grid>

            <Button
              type="submit"
              variant="contained"
              className="createAcc"
              style={{ width: '100%', marginTop: '20%' }}
              onClick={() => {
                // if (!compId) {
                handleCreateCompany({ inputValues, numbers, userEmail });
                // }
              }}
            >
              Continue
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25', marginLeft: '20' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </FormProvider>
        </Grid>
      </Grid>

      <Grid container item xs={6} alignItems="center" justifyContent="center" style={{ backgroundColor: '#DBDBDB' }}>
        <Grid item xs={6}>
          <img src="../../assets/svg/ca-p2.svg" alt="" style={{ width: 500 }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default regPage2;
