/* eslint-disable-next-line */
import * as React from 'react';
import { Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export interface CompanyHierarchyProps {
  warehouseData: any;
}

export function CompanyHierarchy({ warehouseData }: CompanyHierarchyProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid sx={{ maxHeight: '800px', overflow: 'scroll' }} container rowGap={2} columnGap={2}>
        {warehouseData &&
          warehouseData.warehouses.map((warehouse) => {
            console.log(warehouse);

            return <WarehouseCard handleOpen={handleOpen} warehouse={warehouse} />;
          })}
        {/* <WarehouseCard handleOpen={handleOpen} warehouse={''} />
        <WarehouseCard handleOpen={handleOpen} warehouse={''} />
        <WarehouseCard handleOpen={handleOpen} warehouse={''} />
        <WarehouseCard handleOpen={handleOpen} warehouse={''} /> */}
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Assign shops
            </Typography>
            <div className="unassignedShops">
              <div className="shop">
                <span>Shop Name</span>
                <button>Assign</button>
              </div>
              <div className="shop">
                <span>Shop Name</span>
                <button>Assign</button>
              </div>
              <div className="shop">
                <span>Shop Name</span>
                <button>Assign</button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default CompanyHierarchy;

type WarehouseCardProps = {
  handleOpen: () => void;
  warehouse: any;
};

const WarehouseCard = ({ handleOpen, warehouse }: WarehouseCardProps) => {
  // let assignedShops = warehouse.assigned_shops;
  // console.log('shops', assignedShops);
  // console.log(warehouse);

  return (
    <>
      <div className="warehouseCard">
        <span className="whName">Kottawa Warehouse</span>
        <div>
          <h2>Currently Assigned Shops</h2>
          <div className="assignedShops">
            {/* {assignedShops &&
              assignedShops.map((shop) => {
                return <ShopSection />;
              })} */}
            {/* <ShopSection />
            <ShopSection />
            <ShopSection /> */}
          </div>
          <Button onClick={handleOpen}>
            <h2>Assign Shops</h2>
          </Button>
        </div>
      </div>
    </>
  );
};

const ShopSection = () => {
  return (
    <>
      <div className="shop">
        <span>Shop Name</span>
        <button>Unassign</button>
      </div>
    </>
  );
};
