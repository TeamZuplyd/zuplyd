/* eslint-disable-next-line */
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useState } from 'react';
export interface ContactDetailsFormComponentProps {}

export function ContactDetailsFormComponent(props: ContactDetailsFormComponentProps) {
  const [inputState, setInputState] = useState(true);
  const [newPhoneNumber, setNewPhoneNumber] = useState([]);

  const changeInputState = () => {
    setInputState(!inputState)
  }

  const addNewTextField = () => {
    const arr: any = [...newPhoneNumber, []]
    setNewPhoneNumber(arr)
  }


  const phoneNumbers: string[] = ["011 2854711", "011 2547899", "077 44185597", "011 2587411"]
  let count: number = 1

  return (
    <>
    <Card sx={{ width: "899px", maxWidth:"899px", height: "fit-content",maxHeight: "380px" }}>
              <CardContent>

                  <Grid container rowGap={2} columnGap={2.5}>
                      <Grid item xs={10.3}>
                            <Typography variant="h5" component="div" sx={{fontWeight: 700}} style={{color:"#1f2937"}}>
                              Conatct Details
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

                  <Grid container rowGap={0} columnGap={1}>
                      {phoneNumbers.map((no)=> {
                          return (
                          <Grid item xs={2.5}> 
                            <TextField id="outlined-basic" onChange={addNewTextField} defaultValue={no} disabled = {inputState} label={"Conatct #"+count++} variant="outlined" size="small" sx={{mt:4, width: '160px'}} /> 
                          </Grid>)
                      })}

                      {newPhoneNumber.map((no)=> {
                          return (
                          <Grid item xs={2.5}> 
                            <TextField id="outlined-basic" defaultValue={no} disabled = {inputState} label={"Conatct #"+count++} variant="outlined" size="small" sx={{mt:4, mb:5, width: '160px'}} /> 
                          </Grid>)
                      })}

                        <Grid item xs={1}> 
                          <Button variant="contained" sx={{width:120, mt:4, mb:5, backgroundColor:"transparent",color:"blue"}} className="addnewBtn"  onClick={addNewTextField} > {count-1<5?"+ Add New": " "} </Button>
                        </Grid>
                  </Grid>

                  <Grid container rowGap={0} columnGap={1}>
                      <Grid item xs={2.5}> 
                        <TextField id="outlined-basic" defaultValue={"abc@gmail.com"} disabled = {inputState} label="Email" variant="outlined" size="small" sx={{mb:5, width: '350px'}} /> 
                      </Grid>
                  </Grid>


                  <Grid container rowGap={2} columnGap={4}>
                      <Grid item xs={2}>
                          <Button variant="contained" color="success" sx={{width:140, mb:2}} className="saveChangesBtn" > Save Changes </Button>
                      </Grid>

                      <Grid item xs={5}>
                          <Button variant="contained" sx={{width:100, backgroundColor:"transparent",color:"black"}} className="addnewBtn" > Discard </Button>
                      </Grid>
                  </Grid>
              </CardContent>
        </Card>
    
    
    
    
    </>
  );
}

export default ContactDetailsFormComponent;
