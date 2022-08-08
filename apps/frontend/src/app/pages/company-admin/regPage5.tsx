import React from 'react';
import { Typography, Grid, Box, Button, Card } from '@mui/material';
import { useState } from 'react';
import EmailList from '../../components/email-list/email-list';
import InitialAddForm from '../../components/initial-add-form/initial-add-form';
type Props = {};

const RegPage5 = (props: Props) => {
  const [shopManagerEmails, setShopManagerEmails] = useState<string[]>([]);
  const [warehouseManagerEmails, setWarehouseManagerEmails] = useState<
    string[]
  >([]);
  const [procurementManagerEmails, setProcurementManagerEmails] = useState<string[]>([]);

  const addShopManagerEmail = (email: string) => {
    setShopManagerEmails([...shopManagerEmails, email]);
  };
  
  const addWarehouseManagerEmail = (email: string) => {
    setWarehouseManagerEmails([...warehouseManagerEmails, email]);
  };

  const addProcurementManagerEmail = (email: string) => {
    setProcurementManagerEmails([...procurementManagerEmails, email]);
  };

  const deleteShopManagerEmail = (index: number) => {
    console.log('delete ' + index);
    setShopManagerEmails((shopManagerEmails) =>
      shopManagerEmails.filter((_, i) => i !== index)
    );
    console.log('delete ' + index);
  };

  const deleteWarehouseManagerEmail = (index: number) => {
    setWarehouseManagerEmails((warehouseManagerEmails) =>
      warehouseManagerEmails.filter((_, i) => i !== index)
    );
  };

  const deleteProcurementManagerEmail = (index: number) => {
    setProcurementManagerEmails((procurementManagerEmails) =>
      procurementManagerEmails.filter((_, i) => i !== index)
    );
  };

  return (
    <Grid container rowGap={0} columnGap={0} sx={{py:1}}>
      <Grid
        container
        item
        xs={12}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          container
          item
          xs={12}
          direction="column"
          rowSpacing={1}
          style={{ maxWidth: '75%' }}
        >
          <Grid item xs={12}>
            <Button
              variant="contained"
              className="goBack"
              style={{ width: '15%' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: '25' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Go Back
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 500, fontSize: 36 }}
              style={{ textAlign: 'center' }}
            >
              Add procurement, warehouse & shop managers.
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            {/* pm */}
            <Grid
              container
              item
              xs={12}
              md={4}
              sx={{ mt: 1 }}
              alignItems="center"
              justifyContent="space-evenly"
              direction="column"
            >
              <Typography
                variant="h6"
                style={{ textAlign: 'start', paddingBottom: '1rem' }}
              >
                Procurement Managers
              </Typography>
              <Box
                sx={{ bgcolor: '#CBCBCB' }}
                style={{ maxHeight: 350, minHeight: 350, overflow: 'auto' }}
              >
                <InitialAddForm addEmail={addProcurementManagerEmail} />
                <EmailList
                  emails={procurementManagerEmails}
                  handleDelete={deleteProcurementManagerEmail}
                />
              </Box>
            </Grid>
            {/* wm */}
            <Grid
              container
              item
              xs={12}
              md={4}
              sx={{ mt: 1 }}
              alignItems="center"
              justifyContent="space-evenly"
              direction="column"
            >
              <Typography
                variant="h6"
                style={{ textAlign: 'start', paddingBottom: '1rem' }}
              >
                Warehouse Managers
              </Typography>
              <Box
                sx={{ bgcolor: '#CBCBCB' }}
                style={{ maxHeight: 350, minHeight: 350, overflow: 'auto' }}
              >
                <InitialAddForm addEmail={addWarehouseManagerEmail} />
                <EmailList
                  emails={warehouseManagerEmails}
                  handleDelete={deleteWarehouseManagerEmail}
                />
              </Box>
            </Grid>
            {/* SM */}
            <Grid
              container
              item
              xs={12}
              md={4}
              sx={{ mt: 1 }}
              alignItems="center"
              justifyContent="space-evenly"
              direction="column"
            >
              <Typography
                variant="h6"
                style={{ textAlign: 'left', paddingBottom: '1rem' }}
              >
                Shop Managers
              </Typography>
              <Box
                sx={{ bgcolor: '#CBCBCB' }}
                style={{ maxHeight: 350, minHeight: 350, overflow: 'auto' }}
              >
                <InitialAddForm addEmail={addShopManagerEmail} />
                <EmailList
                  emails={shopManagerEmails}
                  handleDelete={deleteShopManagerEmail}
                />
              </Box>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            className="createAcc"
            style={{ width: '25%', marginTop: '5%', alignSelf: 'center' }}
          >
            Continue
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={{ width: '25', marginLeft: '20' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default RegPage5;
