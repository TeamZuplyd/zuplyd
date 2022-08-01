/* eslint-disable-next-line */
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState } from 'react';

export interface FormComponentProps {}

export function FormComponent(props: FormComponentProps) {
  const [inputState, setInputState] = useState(true);

  const changeInputState = () => {
    setInputState(!inputState)
  }

  return (
    <>
          <Card sx={{ width: "899px", maxWidth:"899px", height: "280px",maxHeight: "280px" }}>
              <CardContent>

                  <Grid container rowGap={2} columnGap={2.5}>
                      <Grid item xs={10}>
                            <Typography variant="h5" component="div" sx={{fontWeight: 700}} style={{color:"#1f2937"}}>
                              Company Information
                            </Typography>
                      </Grid>

                      <Grid item xs={1}>
                          <Button variant="contained" sx={{width:100, backgroundColor:"#9ca3af"}} className="editBtn" onClick={changeInputState}>
                            <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{height:'15px', width: '20px', marginRight:"8px"}}>
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                  Edit
                            </div>
                          </Button>
                      </Grid>
                  </Grid>

                  <Grid container rowGap={2} columnGap={4}>
                      <Grid item xs={5}>
                          <TextField id="outlined-basic" defaultValue="ZupplyD" disabled = {inputState} label="Company Name" variant="outlined" size="small" sx={{mt:4,  width: '340px'}} />
                      </Grid>

                      <Grid item xs={5}>
                        <TextField id="outlined-multiline-static" multiline label="Address"  disabled = {inputState} rows={4} variant="outlined" sx={{mt:4, width: '449px'}} />
                      </Grid>
                  </Grid>

                  <Grid container rowGap={2} columnGap={4}>
                      <Grid item xs={2}>
                          <Button variant="contained" color="success" sx={{width:140}} className="editBtn" > Save Changes </Button>
                      </Grid>

                      <Grid item xs={5}>
                          <Button variant="contained" sx={{width:100, backgroundColor:"transparent",color:"black"}} className="editBtn" > Discard </Button>
                      </Grid>
                  </Grid>
                    
              </CardContent>

          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
    </>
  );
}

export default FormComponent;
