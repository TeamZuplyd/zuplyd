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

export interface IssueFormProps {}

export function IssueForm(props: IssueFormProps) {
  const [titleName, setTitleName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [desc, setDesc] = useState('');

  const discardBtnClick = () => {
    setTitleName('');
    setBatchNumber('');
    setDesc('');
  };

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}>
      <Card sx={{ width: '400px', maxWidth: '400px', height: '480px', maxHeight: '480px', justifyContent: 'center', alignItems: 'center', p: 2 }}>
        <CardContent>
          <Grid container xs={12} rowGap={2} columnGap={2.5}>
            <Grid item xs={12}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'center' }} style={{ color: '#1f2937' }}>
                Raise an issue
              </Typography>
            </Grid>
          </Grid>

          <Grid container xs={12} rowGap={2} columnGap={4}>
            <Grid item xs={12}>
              <TextField
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
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                id="outlined-basic"
                value={desc}
                label="Description"
                variant="outlined"
                rows={5}
                multiline
                sx={{ mt: 2, width: '100%' }}
              />
            </Grid>
          </Grid>

          <Grid container rowGap={2} columnGap={4}>
            <Grid item xs={4}>
              <Button variant="contained" color="success" sx={{ width: 140 }} className="saveChangesBtn">
                {' '}
                Save Changes{' '}
              </Button>
            </Grid>

            <Grid item xs={3}>
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
