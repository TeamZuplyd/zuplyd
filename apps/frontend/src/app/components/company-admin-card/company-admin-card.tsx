/* eslint-disable-next-line */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Modal, TextField, Box } from '@mui/material';
import SideOver from '../side-over/side-over';

export interface CompanyAdminCardProps {
  warehouse: string;
  name: string;
  telephoneNumber: string;
  data: any;
  title: string;
}

export function CompanyAdminCard({ name, telephoneNumber, warehouse, data, title }: CompanyAdminCardProps) {
  const [rightSideNav, setrightSideNav] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setrightSideNav(!rightSideNav);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  return (
    <>
      <SideOver toggle={rightSideNav} toggleDrawer={toggleDrawer} data={data} />
      <Card sx={{ minWidth: 300, width: 300, ml: 2 }}>
        <CardContent sx={{ pl: 3, pr: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {warehouse}
          </Typography>

          <Grid container rowGap={2}>
            <Grid item xs={1.5}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sideNav-icon" viewBox="0 0 20 20" fill="currentColor" style={{ height: 18 }}>
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </Grid>

            <Grid item xs={8} style={{ wordBreak: 'break-word' }}>
              <Typography variant="body2">{name}</Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={1.5}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sideNav-icon" viewBox="0 0 20 20" fill="currentColor" style={{ height: 18, marginRight: 10 }}>
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </Grid>

            <Grid item xs={8} style={{ wordBreak: 'break-word' }}>
              <Typography variant="body2">{telephoneNumber}</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ pl: 3, pr: 3 }}>
          <Button size="small" onClick={toggleDrawer(true)}>
            More Info
          </Button>
          <Button size="small" color="success">
            {/* <Button size="small" color="success" onClick={handleOpen}> */}
            Edit
          </Button>
          <EditModal open={open} handleClose={handleClose} title={title} />
          <Button size="small" color="warning" onClick={handleOpenModal}>
            Delete
          </Button>
          <DeleteModal open={openModal} handleClose={handleCloseModal} title={title} />
        </CardActions>
      </Card>
    </>
  );
}

export default CompanyAdminCard;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 200,
  maxHeight: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
//modal component
type ContainerModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
};

const DeleteModal = ({ open, handleClose, title }: ContainerModalProps) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" textAlign="center">
          Delete {title}
        </Typography>
        <Box>
          <Typography variant="body1" pt={2}>
            {' '}
            Are you sure to delete the {title}?
          </Typography>
          <Grid container direction="row" justifyContent="space-around" alignItems="center" sx={{}}>
            <Button variant="contained" color="warning" sx={{ mt: 4, mr: 4 }}>
              Delete
            </Button>
            <Button variant="contained" color="success" sx={{ mt: 4, mr: 'end' }} onClick={handleClose}>
              No
            </Button>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
};

const EditModal = ({ open, handleClose, title }: ContainerModalProps) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" textAlign="center">
          Edit {title}
        </Typography>
      </Box>
    </Modal>
  );
};
