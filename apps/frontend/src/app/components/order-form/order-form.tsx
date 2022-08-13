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

export interface OrderFormProps {
  isOpen: boolean;
}

export function OrderForm({ isOpen }: OrderFormProps) {
  const [urgencyLevel, setUrgencyLevel] = useState('');

  const [itemName, setItemName] = useState('');
  const [units, setUnits] = useState('');
  const [neededWhen, setNeededWhen] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setUrgencyLevel(event.target.value as string);
  };

  const discardBtnClick = () => {
    setItemName('');
    setUnits('');
    setNeededWhen('');
    setUrgencyLevel('');
  };

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}>
      <Card sx={{ width: '400px', maxWidth: '400px', height: '450px', maxHeight: '450px', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent>
          <Grid container rowGap={2} columnGap={2.5}>
            <Grid item xs={10}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'center' }} style={{ color: '#1f2937' }}>
                Order Information
              </Typography>
            </Grid>
          </Grid>

          <Grid container rowGap={2} columnGap={4}>
            <Grid item xs={7}>
              <TextField
                onChange={(e) => {
                  setItemName(e.target.value);
                }}
                id="outlined-basic"
                value={itemName}
                label="Name of the item"
                variant="outlined"
                size="small"
                sx={{ mt: 4, width: '340px' }}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                onChange={(e) => {
                  setUnits(e.target.value);
                }}
                id="outlined-basic"
                value={units}
                label="Number of units needed"
                variant="outlined"
                size="small"
                sx={{ mt: 2, width: '340px' }}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                onChange={(e) => {
                  setNeededWhen(e.target.value);
                }}
                id="outlined-basic"
                value={neededWhen}
                label="Needed by"
                variant="outlined"
                size="small"
                sx={{ mt: 2, width: '340px' }}
              />
            </Grid>

            <Grid item xs={12} sx={{ width: '340px' }}>
              <InputLabel id="demo-simple-select-label">Urgency level</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={urgencyLevel} label="Age" onChange={handleChange} sx={{ mb: 5, width: '340px', height: '45px' }}>
                <MenuItem value={10}>Normal</MenuItem>
                <MenuItem value={20}>Moderate</MenuItem>
                <MenuItem value={30}>High</MenuItem>
              </Select>

              {/* <TextField onChange={(e) => {}} id="outlined-basic" value={'text1Value'} label="Company Name" variant="outlined" size="small" sx={{ mt: 2, width: '340px' }} /> */}
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

export default OrderForm;
