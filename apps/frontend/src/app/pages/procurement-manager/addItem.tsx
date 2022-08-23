import React from 'react';
import { useState, useRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { TextField, Grid, Button, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { truncate } from 'fs/promises';
import CategoryCardPM from '../../components/category-card-pm/category-card-pm';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useMutation } from 'react-query';

function addItem() {
  const [itemNameTextFieldValue, setItemNameTextFieldValue] = useState('');
  const [categoryTextFieldValue, setCategoryTextFieldValue] = useState('');
  const [itemBrandTextFieldValue, setItemBrandTextFieldValue] = useState('');
  const [minReleaseQTextFieldValue, setMinReleaseQTextFieldValue] = useState('');

  const [minReleaseQTextFieldDropDown, setMinReleaseQTextFieldDropDown] = useState('');

  const [textFieldValue, setTextFieldValue] = useState('');
  const [allAttributes, setAllAttributes] = useState<string[]>([]);
  // const [allUnits, setAllUnits] = useState<string[]>([]);

  const [selected, setSelected] = useState(-1);

  const handleClick = (index: number) => {
    setSelected(index);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [unit, setUnit] = useState('');
  let arr: string[] = [];

  const addAttribute = () => {
    if (textFieldValue != '') {
      setAllAttributes([...allAttributes, textFieldValue]);
      // setAllUnits([...allUnits, unit]);
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
        // arrUnit.push(allUnits[index]);
      }
    }
    setAllAttributes(arrAttr);
    // setAllUnits(arrUnit);
  };

  const discardChanges = () => {
    setItemNameTextFieldValue('');
    setCategoryTextFieldValue('');
    setItemBrandTextFieldValue('');
    setMinReleaseQTextFieldValue('');
    setMinReleaseQTextFieldDropDown('');
    setTextFieldValue('');
    setUnit('');
    setAllAttributes([]);
    // setAllUnits([]);
  };

  const createItemType = async (data: any) => {
    const { data: response } = await axios.post('http://localhost:7000/api/procurement/item/create', data);
    return response.data;
  };

  const { mutate, isLoading } = useMutation(createItemType, {
    onSuccess: (data: any) => {
      handleClose();
      discardChanges();
    },
    onError: () => {
      alert('there was an error');
    },
  });

  const saveChanges = () => {
    const arr: any = {
      item_name: itemNameTextFieldValue,
      category_name: categoryTextFieldValue,
      brand_name: itemBrandTextFieldValue,
      min_release_quantity: parseInt(minReleaseQTextFieldValue),
      min_release_quantity_unit: minReleaseQTextFieldDropDown,
      attributes_array: allAttributes,
      output_rule: allAttributes[selected],
      output_rule_unit: unit,
    };

    mutate(arr);

    console.table(arr);
  };

  let count: number = -1;

  return (
    <>
      <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '70vh' }}>
        <Card sx={{ width: '820px', maxWidth: '820px', height: 'fit-content', maxHeight: 'fit-content', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <CardContent>
            <Grid container rowGap={2} columnGap={2.5}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'left' }} style={{ color: '#1f2937' }}>
                  Item Information
                </Typography>
              </Grid>
            </Grid>

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
                    setMinReleaseQTextFieldValue(e.target.value);
                  }}
                  id="outlined-basic"
                  value={minReleaseQTextFieldValue}
                  label="Min release quantity (in kg)"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, width: '340px' }}
                />
              </Grid>

              <Grid item xs={6}>
                <DropDownUnits categoryTextFieldValue={minReleaseQTextFieldDropDown} setCategoryTextFieldValue={setMinReleaseQTextFieldDropDown} />
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
            </Grid>

            <Divider sx={{ mt: 3, mb: 3 }} />

            <Grid container rowGap={2} columnGap={2.5}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 700, textAlign: 'left' }} style={{ color: '#1f2937' }}>
                  Item Attributes
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ mt: 4, mb: 3 }}>
              <TextField
                id="standard-basic"
                label="Attribute name"
                variant="standard"
                onChange={(e) => {
                  setTextFieldValue(e.target.value);
                }}
                value={textFieldValue}
              />

              {/* unit drop down */}
              {/* <UnitDropDown unit={unit} setUnit={setUnit} /> */}
              <Button variant="contained" color="primary" sx={{ ml: 3, mt: 1.5 }} onClick={addAttribute}>
                Add new
              </Button>
            </Grid>

            <Grid container xs={12} rowGap={2} columnGap={4} sx={{ mb: 6 }}>
              {allAttributes.map((attrName) => {
                return (
                  <Grid container item xs={3} sx={{ mt: 0 }} direction="row" className="itemAttrSpan">
                    <Grid item xs={10} sx={{ mt: 0 }}>
                      <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: 14 }}>
                        {attrName}
                      </Typography>

                      {/* <Typography variant="h3" gutterBottom component="div" sx={{ fontSize: 14 }}>
                        {allUnits[(count = count + 1)]}
                      </Typography> */}
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
                <Button variant="contained" color="success" sx={{ width: 140 }} className="createAcc" onClick={handleOpen}>
                  {' '}
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '25', marginLeft: '20' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
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

      <ContainerModal open={open} handleClose={handleClose} attributeList={allAttributes} selected={selected} handleClick={handleClick} unit={unit} setUnit={setUnit} saveChanges={saveChanges} />
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
      <InputLabel id="demo-simple-select-standard-label" style={{ paddingTop: 3 }}>
        Unit
      </InputLabel>
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
          <MenuItem value={'Food'}>Food</MenuItem>
          <MenuItem value={'Drinks'}>Drinks</MenuItem>
          <MenuItem value={'Ingredients'}>Ingredients</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

type DropDownUnitsProps = {
  categoryTextFieldValue: string;
  setCategoryTextFieldValue: any;
};

function DropDownUnits({ categoryTextFieldValue, setCategoryTextFieldValue }: SelectLabelsProps) {
  return (
    <div style={{ width: '100' }}>
      <FormControl sx={{ mt: 1, minWidth: 340 }} size="small">
        <InputLabel id="demo-simple-select-helper-label">Unit of measure</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={categoryTextFieldValue}
          label="Age"
          onChange={(e) => {
            setCategoryTextFieldValue(e.target.value);
          }}
        >
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
    </div>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 500,
  maxHeight: 600,
  minWidth: 600,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type ContainerModalProps = {
  open: boolean;
  handleClose: () => void;
  attributeList: string[];
  selected: number;
  handleClick: any;
  unit: string;
  setUnit: any;
  saveChanges: () => void;
};

const ContainerModal = ({ open, handleClose, attributeList, selected, handleClick, unit, setUnit, saveChanges }: ContainerModalProps) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" textAlign="center" sx={{ mb: 5 }}>
          Select the attribute of output rule and the unit of it
        </Typography>
        <form>
          {attributeList.map((attr, index) => (
            <>
              <Card sx={{ minWidth: 200, mt: 1, cursor: 'pointer', backgroundColor: '#ebebeb', pb: 0 }} style={{ backgroundColor: '#ebebeb' }} onClick={() => handleClick(index)} className={selected === index ? 'highlightTier' : ''}>
                <Grid container xs={12}>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14, mb: 0 }} gutterBottom>
                        {attr}
                      </Typography>
                    </CardContent>
                  </Grid>

                  {selected === index ? (
                    <Grid item xs={4}>
                      <UnitDropDown unit={unit} setUnit={setUnit} />
                    </Grid>
                  ) : (
                    <Grid item xs={4}></Grid>
                  )}
                </Grid>
              </Card>
            </>
          ))}

          <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 5 }}>
            <Button variant="contained" color="success" sx={{ mr: 4 }} onClick={saveChanges}>
              Save
            </Button>
            <Button variant="contained" color="warning" sx={{ mr: 'end' }} onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default addItem;
