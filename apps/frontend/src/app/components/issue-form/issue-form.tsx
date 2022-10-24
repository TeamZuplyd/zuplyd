/* eslint-disable-next-line */
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';
import { FormControl } from '@mui/material';
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
      item_name: '',
      batch_number: '',
      description: '',
    },
  });

  const inputValues = methods.watch();

  const handleCreateIssue = () => {
    const body = {
      company_id: 'qwerty',
      user_id: 123,
      item_name: inputValues.item_name,
      batch_no: inputValues.batch_number,
      desc: inputValues.description,
      action_taken: '',
      action_desc: '',
    };

    axios.post('http://localhost:5001/api/issues/create', body).then((res) => {
      console.log('Succefull');
    });
  };

  const handleClick = () => {
    methods.resetField('description');
    methods.resetField('batch_number');
    methods.resetField('item_name');
  };

  const [itemData, setItemData] = useState<any>([]);
  const [batchData, setBatchData] = useState<any>([]);

  const getRequestInfo = () => {
    axios.get('http://localhost:7000/api/procurement/item/findAll/qwerty').then((res) => {
      setItemData(res.data.items);
      console.log(res.data.items);
    });
  };

  const getBatches = () => {
    let indexOfItem: number = 0;

    for (let index = 0; index < itemData.length; index++) {
      if (itemData[index].item_name == inputValues.item_name) {
        indexOfItem = index;
      }
    }

    const itemInfo = {
      _id: itemData[indexOfItem]._id,
      item_name: itemData[indexOfItem].item_name,
      company_id: itemData[indexOfItem].company_id,
      company_name: itemData[indexOfItem].company_name,
      attributes_array: itemData[indexOfItem].attributes_array,
      __v: itemData[indexOfItem].__v,
    };

    const body = {
      ownerId: 123,
      itemType: itemInfo,
    };

    axios.post('http://localhost:4444/api/goods/allBatchNosOfItem', body).then((res) => {
      setBatchData(res.data.batchNos);
    });
  };

  useEffect(() => {
    getRequestInfo();
  }, []);

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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Item Name</InputLabel>
                  <Select {...methods.register('item_name')} labelId="demo-simple-select-label" id="demo-simple-select" onChange={getBatches}>
                    {itemData.map((i: any) => (
                      <MenuItem value={i.item_name}>{i.item_name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Batch Number</InputLabel>
                  <Select {...methods.register('batch_number')} labelId="demo-simple-select-label" id="demo-simple-select">
                    {/* uncomment and add the arr name */}
                    {/* {batchData.map((i: any) => (
                      <MenuItem value={i._id}>{i.item_name}</MenuItem>
                    ))} */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <TextField {...methods.register('description', { required: true })} id="outlined-basic" label="Description" variant="outlined" rows={10} multiline sx={{ mt: 2, width: '100%' }} />
              </Grid>
            </Grid>
          </FormProvider>

          <Grid container rowGap={2} columnGap={1}>
            <Grid item xs={1.5}>
              <Button variant="contained" color="success" sx={{ width: 140 }} className="saveChangesBtn" type="submit" onClick={handleCreateIssue}>
                {' '}
                Save Changes{' '}
              </Button>
            </Grid>

            <Grid item xs={1}>
              <Button variant="contained" sx={{ width: 100, backgroundColor: 'transparent', color: 'black' }} className="addnewBtn" onClick={handleClick}>
                Discard
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default IssueForm;
