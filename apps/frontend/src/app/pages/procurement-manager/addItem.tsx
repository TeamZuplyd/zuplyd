import React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState, useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';

function addItem() {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);

  const [itemNameTextFieldValue, setItemNameTextFieldValue] = useState('');
  const [categoryTextFieldValue, setCategoryTextFieldValue] = useState('');
  const [itemBrandTextFieldValue, setItemBrandTextFieldValue] = useState('');
  const [minReleaseQTextFieldValue, setMinReleaseQTextFieldValue] = useState('');

  const [textFieldValue, setTextFieldValue] = useState('');
  const [allAttributes, setAllAttributes] = useState<string[]>([]);
  const [allUnits, setAllUnits] = useState<string[]>([]);

  const [unit, setUnit] = useState('');
  let arr: string[] = [];

  const addAttribute = () => {
    if (textFieldValue != '') {
      setAllAttributes([...allAttributes, textFieldValue]);
      setAllUnits([...allUnits, unit]);
      setTextFieldValue('');
      setUnit('');
    }
  };

  const deleteAttr = (attrName: any) => {
    let arrAttr: string[] = [];
    let arrUnit: string[] = [];

    for (let index = 0; index < allAttributes.length; index++) {
      if (allAttributes[index] != attrName) {
        arrAttr.push(allAttributes[index]);
        arrUnit.push(allUnits[index]);
      }
    }
    setAllAttributes(arrAttr);
    setAllUnits(arrUnit);
  };

  const discardChanges = () => {
    setItemNameTextFieldValue('');
    setCategoryTextFieldValue('');
    setItemBrandTextFieldValue('');
    setMinReleaseQTextFieldValue('');
    setTextFieldValue('');
    setUnit('');
    setAllAttributes([]);
    setAllUnits([]);
  };

  let count: number = -1;

  return (
    <>
      {/* <SearchButton handleOpen={handleOpen} /> */}

      <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}>
        <Card sx={{ width: '800px', maxWidth: '800px', height: 'fit-content', maxHeight: 'fit-content', justifyContent: 'center', alignItems: 'center' }}>
          <CardContent>
            <Grid container rowGap={2} columnGap={2.5}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'left' }} style={{ color: '#1f2937' }}>
                  Item Information
                </Typography>
              </Grid>
            </Grid>

            {/* const [itemNameTextFieldValue, setItemNameTextFieldValue] = useState('');
const [itemBrandTextFieldValue, setItemBrandTextFieldValue] = useState('');
const [minReleaseQTextFieldValue, setMinReleaseQTextFieldValue] = useState(''); */}

            <Grid container rowGap={2} columnGap={4} sx={{ mt: 1 }}>
              <Grid item xs={5}>
                <TextField
                  onChange={(e) => {
                    setItemNameTextFieldValue(e.target.value);
                  }}
                  id="outlined-basic"
                  value={itemNameTextFieldValue}
                  label="Item Name"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 4, width: '340px' }}
                />
              </Grid>

              <Grid item xs={6}>
                <SelectLabels categoryTextFieldValue={categoryTextFieldValue} setCategoryTextFieldValue={setCategoryTextFieldValue} />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  onChange={(e) => {
                    setItemBrandTextFieldValue(e.target.value);
                  }}
                  id="outlined-basic"
                  value={itemBrandTextFieldValue}
                  label="Item Brand"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, width: '340px' }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  onChange={(e) => {
                    setMinReleaseQTextFieldValue(e.target.value);
                  }}
                  id="outlined-basic"
                  value={minReleaseQTextFieldValue}
                  label="Min release quantity"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, width: '340px' }}
                />
              </Grid>
            </Grid>

            <Divider sx={{ mt: 3, mb: 3 }} />

            <Grid container rowGap={2} columnGap={2.5}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'left' }} style={{ color: '#1f2937' }}>
                  Item Attributes
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 4, mb: 5 }}>
              {/* <TextField size="small" id="outlined-basic" label="Search" variant="outlined" sx={{ ml: 2, mb: 3 }} /> */}
              {/* <TextField onChange={(e) => {}} id="outlined-basic" value={'abc'} label="Item name" variant="outlined" size="small" sx={{ width: '340px', mt: 1.5 }} /> */}
              <TextField
                id="standard-basic"
                label="Attribute name"
                variant="standard"
                onChange={(e) => {
                  setTextFieldValue(e.target.value);
                }}
                value={textFieldValue}
              />

              <UnitDropDown unit={unit} setUnit={setUnit} />
              <Button variant="contained" color="primary" sx={{ ml: 3, mt: 1.5 }} onClick={addAttribute}>
                Add new
              </Button>
            </Grid>

            <Grid container xs={12} rowGap={2} columnGap={4} sx={{ mb: 6 }}>
              {allAttributes.map((attrName) => {
                return (
                  <Grid container item xs={3} sx={{ mt: 0 }} direction="row" className="itemAttrSpan">
                    <Grid item xs={10} sx={{ mt: 0 }}>
                      <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: 18 }}>
                        {attrName}
                      </Typography>

                      <Typography variant="h3" gutterBottom component="div" sx={{ fontSize: 14 }}>
                        {allUnits[(count = count + 1)]}
                      </Typography>
                    </Grid>

                    <Grid item xs={2} sx={{ mt: 0 }}>
                      <button className="spanBtn" onClick={() => deleteAttr(attrName)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '20', marginLeft: '0' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>

            <Grid container rowGap={2} columnGap={4}>
              <Grid item xs={4}>
                <Button variant="contained" color="success" sx={{ width: 140 }} className="saveChangesBtn">
                  {' '}
                  Save Changes{' '}
                </Button>
              </Grid>

              <Grid item xs={3}>
                <Button variant="contained" sx={{ width: 100, backgroundColor: 'transparent', color: 'black' }} className="addnewBtn" onClick={discardChanges}>
                  {' '}
                  Discard{' '}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

type UnitDropDownProps = {
  unit: string;
  setUnit: any;
};

function UnitDropDown({ unit, setUnit }: UnitDropDownProps) {
  return (
    <FormControl variant="standard" sx={{ ml: 4, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">Unit</InputLabel>
      <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={unit} onChange={(e) => setUnit(e.target.value)} label="Unit">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'kg'}>kg</MenuItem>
        <MenuItem value={'g'}>g</MenuItem>
        <MenuItem value={'l'}>l</MenuItem>
        <MenuItem value={'ml'}>ml</MenuItem>
        <MenuItem value={'m'}>m</MenuItem>
        <MenuItem value={'cm'}>cm</MenuItem>
        <MenuItem value={'foot'}>foot</MenuItem>
      </Select>
    </FormControl>
  );
}

type SelectLabelsProps = {
  categoryTextFieldValue: string;
  setCategoryTextFieldValue: any;
};

function SelectLabels({ categoryTextFieldValue, setCategoryTextFieldValue }: SelectLabelsProps) {
  return (
    <div style={{ width: '100' }}>
      <FormControl sx={{ mt: 3.8, minWidth: 340 }} size="small">
        <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={categoryTextFieldValue}
          label="Age"
          onChange={(e) => {
            setCategoryTextFieldValue(e.target.value);
          }}
        >
          <MenuItem value={10}>Category1</MenuItem>
          <MenuItem value={20}>Category2</MenuItem>
          <MenuItem value={30}>Category3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default addItem;
