import { Button, Card, CardContent, Grid, TextField, Box } from '@mui/material';
import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

export interface InitialAddFormProps {
  addEmail: (email: string) => void;
}

export function InitialAddForm({ addEmail }: InitialAddFormProps) {
  const [input, setInput] = useState<string>('');

  // const handleChange = (e:any) => {
  //   setInput(e.urrentTarget.value);
  // };

  const [emailError, setEmailError] = useState<boolean>(false);

  const validateEmail = (e: any) => {
    const email = e.target.value;
    isEmail(email) ? setEmailError(false) : setEmailError(true);
    setInput(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('handleSubmit');

    if (!emailError && input !== '') {
      setInput(input);
      addEmail(input);
      console.log(input);
      setInput('');
    }
    console.log()
  };

  return (
    <Box>
      <CardContent
        sx={{
          mx: 1,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container rowGap={0} columnGap={0} direction="row">
            <Grid item xs={8}>
              <TextField
                sx={{ mt: 1, mb: 1 }}
                fullWidth
                onChange={(e) => validateEmail(e)}
                autoComplete="off"
                id="email"
                label="Email"
                variant="standard"
                type="email"
                error={emailError}
                helperText={!emailError ? ' ' : 'Invalid Email'}
                value={input}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{
                  m: 2,
                  backgroundColor: '#1F2937',
                  '&:hover': {
                    backgroundColor: '#1F2937',
                  },
                }}
                variant="contained"
                type="submit"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Box>
  );
}

export default InitialAddForm;
