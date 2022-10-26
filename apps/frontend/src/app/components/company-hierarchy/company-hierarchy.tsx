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
  shopData: any;
  warehouseData: any;
}

export function CompanyHierarchy({ shopData, warehouseData }: CompanyHierarchyProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedWarehouse, setSelectedWarehouse] = React.useState(null);

  return (
    <>
      <Grid sx={{ maxHeight: '800px', overflow: 'scroll' }} container rowGap={2} columnGap={2}>
        {warehouseData &&
          warehouseData.warehouses.map((warehouse) => {
            return <WarehouseCard open={open} handleOpen={handleOpen} handleClose={handleClose} warehouse={warehouse} setSelectedWarehouse={setSelectedWarehouse} />;
          })}
      </Grid>
      <AssignShopModal open={open} handleClose={handleClose} shopData={shopData} selectedWarehouse={selectedWarehouse} />
    </>
  );
}

export default CompanyHierarchy;

type WarehouseCardProps = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  warehouse: any;
  setSelectedWarehouse: (warehouse) => any;
};

const WarehouseCard = ({ open, handleOpen, handleClose, warehouse, setSelectedWarehouse }: WarehouseCardProps) => {
  let assignedShops = warehouse.assigned_shops;

  return (
    <>
      <div className="warehouseCard">
        <span className="whName">{warehouse.name}</span>
        {/* <br />
        <span>{warehouse.manager_id!}</span>
        <br />
        <span>{warehouse.contact_no[0]!}</span> */}
        <div>
          <h2>Currently Assigned Shops</h2>
          <div className="assignedShops">
            {assignedShops &&
              assignedShops.map((shop) => {
                return <ShopSection shop={shop} warehouse_id={warehouse._id} flag={true} />;
              })}
          </div>
          <Button
            onClick={() => {
              setSelectedWarehouse(warehouse);
              handleOpen();
            }}
          >
            <h2>Assign Shops</h2>
          </Button>
        </div>
      </div>
    </>
  );
};

type ShopSectionProp = {
  warehouse_id: any;
  shop: any;
  flag: boolean;
};

const ShopSection = ({ warehouse_id, shop, flag }: ShopSectionProp) => {
  // console.log(shop);

  return (
    <>
      <div className="shop">
        {flag && (
          <>
            <span>{shop.shop_name}</span>
            <button onClick={() => unassignShop(warehouse_id, shop.shop_id)}>Unassign</button>
          </>
        )}
        {!flag && (
          <>
            <span>{shop.name}</span>
            <button onClick={() => assignShop(warehouse_id, shop.shop_id)}>Assign</button>
          </>
        )}
      </div>
    </>
  );
};

type AssignShopModalProps = {
  open: boolean;
  handleClose: () => void;
  shopData: any;
  selectedWarehouse: any;
};

const AssignShopModal = ({ open, handleClose, shopData, selectedWarehouse }) => {
  let unassignedShopList = [];
  unassignedShopList = selectedWarehouse
    ? shopData.shop.filter((shop) => {
        return !selectedWarehouse.assigned_shops.find((element) => {
          return element.shop_id === shop._id;
        });
      })
    : [];
  // open && console.log(unassignedShopList);

  return (
    <>
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
              {unassignedShopList.length !== 0 &&
                unassignedShopList.map((unassignedShop) => {
                  return <ShopSection shop={unassignedShop} warehouse_id={selectedWarehouse._id} flag={false} />;
                })}
              {/* {shopData &&
            shopData.shop.map((shop) => {
              return <ShopSection shop={shop} warehouse_id={warehouse._id} />;
            })} */}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

async function unassignShop(warehouse_id: any, shop_id: any) {
  console.log(`Unassigning ${shop_id} from ${warehouse_id}`);
}

async function assignShop(warehouse_id: any, shop_id: any) {
  console.log(`Assigning ${shop_id} to ${warehouse_id}`);
}
