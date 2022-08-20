/* eslint-disable-next-line */
import * as React from 'react';
import { TextField, Grid, Button, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';

export interface CategoryCardPMProps {
  name: string;
  itemCount: string;
}

export function CategoryCardPM({ name, itemCount }: CategoryCardPMProps) {
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const handleEditFormOpen = () => setOpenEditForm(true);
  const handleEditFormClose = () => setOpenEditForm(false);

  const [textFieldValue, setTextFieldValue] = React.useState(name);

  return (
    <>
      <Card sx={{ minWidth: 300, width: 300, maxHeight: 90, height: 90, ml: 2 }}>
        <CardContent sx={{ pl: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {name}
          </Typography>

          <Grid container rowGap={2}>
            {/* <Grid item xs={1.5}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sideNav-icon" viewBox="0 0 20 20" fill="currentColor" style={{ height: 18 }}>
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </Grid> */}

            <Grid item xs={8} style={{ wordBreak: 'break-word' }}>
              <Typography variant="body2">Number of items: {itemCount}</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button size="small" style={{ position: 'relative', left: 200, bottom: 50 }} onClick={handleEditFormOpen}>
            Edit name
          </Button>
        </CardActions>
      </Card>

      <EditBtnModal openEditForm={openEditForm} handleEditFormClose={handleEditFormClose} textValue={name} textFieldValue={textFieldValue} setTextFieldValue={setTextFieldValue} />
    </>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 250,
  maxHeight: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

//editBtn Model component
type EditBtnModalProps = {
  openEditForm: boolean;
  textValue: string;
  textFieldValue: string;
  setTextFieldValue: any;
  handleEditFormClose: () => void;
};

const EditBtnModal = ({ openEditForm, handleEditFormClose, textValue, textFieldValue, setTextFieldValue }: EditBtnModalProps) => {
  // const [textFieldValue, setTextFieldValue] = React.useState(textValue);

  return (
    <Modal open={openEditForm} onClose={handleEditFormClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" textAlign="center">
          Change category name
        </Typography>
        <form>
          <TextField id="Email" label="Category Name" variant="outlined" size="small" margin="dense" sx={{ mt: 4 }} fullWidth value={textFieldValue} onChange={(e) => setTextFieldValue(e.target.value)} />
          <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{}}>
            <Button variant="contained" color="success" sx={{ mt: 4, mr: 4 }}>
              Save changes
            </Button>
            <Button variant="contained" color="warning" sx={{ mt: 4, mr: 'end' }} onClick={handleEditFormClose}>
              Cancel
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryCardPM;
