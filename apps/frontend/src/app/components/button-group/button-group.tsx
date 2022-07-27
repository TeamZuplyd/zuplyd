/* eslint-disable-next-line */
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export interface CustomButtonGroupProps {
  btnNames: String [] 
}

export function CustomButtonGroup({btnNames}: CustomButtonGroupProps) {

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {btnNames.map((btn)=> {
            return (<Button style={{backgroundColor:"white", color:"#111827"}}> {btn}</Button>)
        })}
    </ButtonGroup>
  );
}

export default CustomButtonGroup;
