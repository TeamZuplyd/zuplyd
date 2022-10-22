/* eslint-disable-next-line */
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';

export interface IssueFormProps {}

const createNewIssue = async (inputValues: any): Promise<any> => {
  // inputValues.contact_nums = numbers;
  // postData.comp_data = inputValues;
  // const response1 = await axios.post(`http://localhost:3333/api/companies/register`, postData);
  // const userBody = {
  //   email: userEmail,
  //   role: 'comp_admin',
  //   company_name: inputValues.company_name,
  //   company_id: '',
  // };
  // userBody.company_id = response1.data.comp_id;
  // const response2 = await axios.post(`http://localhost:7000/api/user-mgmt/register`, userBody);
  // console.log(response1.data.comp_id);
  // localStorage.setItem('comp_id', response1.data.comp_id);
  // console.log('done');
  // return response1 && response2;
};

export function IssueForm(props: IssueFormProps) {
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      issue_title: '',
      batch_number: '',
      description: '',
    },
  });

  const inputValues = methods.watch();

  const useCreateIssue = () => {
    return useMutation(createNewIssue);
  };

  const { mutate: createIssue } = useCreateIssue();

  const handleCreateIssue = (inputValues: any) => {
    createIssue(inputValues);
  };

  const [titleName, setTitleName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [desc, setDesc] = useState('');

  const discardBtnClick = () => {
    setTitleName('');
    setBatchNumber('');
    setDesc('');
  };

  return (
    <Grid container style={{ minHeight: '70vh' }}>
      <Card sx={{ width: '100%', maxWidth: '100%', height: '50%', maxHeight: '50%', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <CardContent>
          <Grid container xs={12} rowGap={2} columnGap={2.5}>
            <Grid item xs={12}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'center' }} style={{ color: '#1f2937' }}>
                Raise an issue
              </Typography>
            </Grid>
          </Grid>

          <FormProvider {...methods}>
            <Grid container xs={12} rowGap={2} columnGap={4}>
              <Grid item xs={12}>
                <TextField
                  {...methods.register('issue_title', { required: true })}
                  onChange={(e) => {
                    setTitleName(e.target.value);
                  }}
                  id="outlined-basic"
                  value={titleName}
                  label="Title"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 4, width: '100%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...methods.register('batch_number', { required: true })}
                  onChange={(e) => {
                    setBatchNumber(e.target.value);
                  }}
                  id="outlined-basic"
                  value={batchNumber}
                  label="Batch number"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2, width: '100%' }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 3 }}>
                <TextField
                  {...methods.register('description', { required: true })}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  id="outlined-basic"
                  value={desc}
                  label="Description"
                  variant="outlined"
                  rows={10}
                  multiline
                  sx={{ mt: 2, width: '100%' }}
                />
              </Grid>
            </Grid>
          </FormProvider>

          <Grid container rowGap={2} columnGap={1}>
            <Grid item xs={1.5}>
              <Button
                variant="contained"
                color="success"
                sx={{ width: 140 }}
                className="saveChangesBtn"
                type="submit"
                onClick={() => {
                  handleCreateIssue({ inputValues });
                }}
              >
                {' '}
                Save Changes{' '}
              </Button>
            </Grid>

            <Grid item xs={1}>
              <Button variant="contained" sx={{ width: 100, backgroundColor: 'transparent', color: 'black' }} className="addnewBtn" onClick={discardBtnClick}>
                {' '}
                Discard{' '}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default IssueForm;
