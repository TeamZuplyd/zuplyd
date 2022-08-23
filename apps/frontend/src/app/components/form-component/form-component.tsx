/* eslint-disable-next-line */
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState, useRef } from 'react';

export interface FormComponentProps {
  companyName: string;
  companyAddress: string;
}

export function FormComponent({ companyName, companyAddress }: FormComponentProps) {
  const [inputState, setInputState] = useState(true);
  const [text1Value, setText1Value] = useState(companyName);
  const [text2Value, setText2Value] = useState(companyAddress);

  const [currentValues, setCurrentValues] = useState([companyName, companyAddress]);
  const [newValues, setNewValues] = useState([]);

  const refText = useRef();

  const changeInputState = () => {
    setInputState(!inputState);
  };

  const discardBtnClick = () => {
    if (text1Value != companyName) {
      setText1Value(companyName);
    }

    if (text2Value != companyAddress) {
      setText2Value(companyAddress);
      console.log(companyAddress);

      console.log('companyAddress');
    }
  };

  //make a function for save --> check with companyName and companyAddress to see if the values have changedifs send the request

  return (
    <>
      <Card sx={{ width: '899px', maxWidth: '899px', height: '300px', maxHeight: '300px', p: 2 }} style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <CardContent>
          <Grid container rowGap={2} columnGap={2.5}>
            <Grid item xs={10}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 700 }} style={{ color: '#1f2937' }}>
                Company Information
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <Button variant="contained" sx={{ width: 100, backgroundColor: '#9ca3af' }} className="editBtn" onClick={changeInputState}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ height: '15px', width: '20px', marginRight: '8px' }}>
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </div>
              </Button>
            </Grid>
          </Grid>

          <Grid container rowGap={2} columnGap={4}>
            <Grid item xs={5}>
              <TextField
                onChange={(e) => {
                  setText1Value(e.target.value);
                }}
                id="outlined-basic"
                value={text1Value}
                disabled={inputState}
                label="Company Name"
                variant="outlined"
                size="small"
                sx={{ mt: 4, width: '340px' }}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                onChange={(e) => {
                  setText2Value(e.target.value);
                }}
                id="outlined-multiline-static"
                multiline
                label="Address"
                disabled={inputState}
                rows={4}
                variant="outlined"
                sx={{ mt: 4, width: '449px' }}
                value={text2Value}
              />
            </Grid>
          </Grid>

          <Grid container rowGap={2} columnGap={4}>
            <Grid item xs={2}>
              <Button variant="contained" color="success" sx={{ width: 140 }} className="saveChangesBtn">
                {' '}
                Save Changes{' '}
              </Button>
            </Grid>

            <Grid item xs={5}>
              <Button variant="contained" sx={{ width: 100, backgroundColor: 'transparent', color: 'black' }} className="addnewBtn" onClick={discardBtnClick}>
                {' '}
                Discard{' '}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default FormComponent;
