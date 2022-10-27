import * as React from 'react';
import { TextField, Grid, Button, Typography, Box, Modal, Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { truncate } from 'fs/promises';
import CategoryCardPM from '../../components/category-card-pm/category-card-pm';
import axios from 'axios';

// const allCategories = [
//   ['Food', '2'],
//   ['Drinks', '3'],
//   ['Ingredients', '5'],
// ];

export interface addCategoryProps {
  itemInfo: any[];
}

function addCategory({ itemInfo }: addCategoryProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [itemInfo, setItemInfo] = React.useState<any>([]);
  const [allCategories, setAllCategories] = React.useState<any>([]);
  const [changeCateogryName, setChangeCateogryName] = React.useState<any>('');

  const getItemInfo = () => {
    let obj = {};

    for (let index = 0; index < itemInfo.length; index++) {
      if (obj.hasOwnProperty(itemInfo[index].category_name)) {
        obj[itemInfo[index].category_name] = obj[itemInfo[index].category_name] + 1;
      } else {
        obj[itemInfo[index].category_name] = 1;
      }
    }

    const arr: any = [];
    const objKeys = Object.keys(obj);
    const objValues = Object.values(obj);

    for (let index = 0; index < objKeys.length; index++) {
      arr.push([objKeys[index], objValues[index]]);
    }

    setAllCategories(arr);
  };

  const addNewCategory = () => {
    const company_id = JSON.parse(localStorage.getItem('userData') || '').company_id;
    // const company_id = 'qwerty';

    const body = {
      company_id: company_id,
      categoryArr: changeCateogryName,
    };
    const company_ID = 'qwerty';
    axios.post('http://localhost:7000/api/procurement/item-category/createCategory', body).then((res) => {
      window.location.reload();
    });
  };

  React.useEffect(() => {
    getItemInfo();
  }, []);

  return (
    <>
      {/* <SearchButton handleOpen={handleOpen} /> */}
      <TextField size="small" id="outlined-basic" label="Search" variant="outlined" sx={{ ml: 2, mb: 3 }} />
      <Button variant="contained" color="primary" sx={{ ml: 2, mb: 2 }} onClick={handleOpen}>
        Add new
      </Button>

      <Grid container rowGap={2} columnGap={2}>
        {allCategories.map((categoryDetails) => (
          <>
            <Grid item>
              <CategoryCardPM name={categoryDetails[0]} itemCount={categoryDetails[1]} />
            </Grid>
          </>
        ))}
      </Grid>

      <ContainerModal open={open} handleClose={handleClose} addNewCategory={addNewCategory} setChangeCateogryName={setChangeCateogryName} />
    </>
  );
}

// interface CompanyAdminCardProps {
//   name: string;
//   itemCount: string;
//   handleEditFormOpen: () => void;
// }

// export function CategoryCard({ name, itemCount, handleEditFormOpen }: CompanyAdminCardProps) {
//   return (
//     <>
//       <Card sx={{ minWidth: 300, width: 300, maxHeight: 90, height: 90, ml: 2 }}>
//         <CardContent sx={{ pl: 3 }}>
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             {name}
//           </Typography>

//           <Grid container rowGap={2}>
//             {/* <Grid item xs={1.5}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sideNav-icon" viewBox="0 0 20 20" fill="currentColor" style={{ height: 18 }}>
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//               </svg>
//             </Grid> */}

//             <Grid item xs={8} style={{ wordBreak: 'break-word' }}>
//               <Typography variant="body2">Number of items: {itemCount}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>

//         <CardActions>
//           <Button size="small" style={{ position: 'relative', left: 200, bottom: 50 }} onClick={handleEditFormOpen}>
//             Edit name
//           </Button>
//         </CardActions>
//       </Card>
//     </>
//   );
// }

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
// type EditBtnModalProps = {
//   openEditForm: boolean;
//   textValue: string;
//   handleEditFormClose: () => void;
// };

// const EditBtnModal = ({ openEditForm, handleEditFormClose, textValue }: EditBtnModalProps) => {
//   return (
//     <Modal open={openEditForm} onClose={handleEditFormClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//       <Box sx={style}>
//         <Typography variant="h6" textAlign="center">
//           Change category name
//         </Typography>
//         <form>
//           <TextField id="Email" label="Category Name" variant="outlined" size="small" margin="dense" sx={{ mt: 4 }} fullWidth value={textValue} />
//           <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{}}>
//             <Button variant="contained" color="success" sx={{ mt: 4, mr: 4 }}>
//               Add
//             </Button>
//             <Button variant="contained" color="warning" sx={{ mt: 4, mr: 'end' }} onClick={handleEditFormClose}>
//               Cancel
//             </Button>
//           </Grid>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

//modal component
type ContainerModalProps = {
  open: boolean;
  handleClose: () => void;
  addNewCategory: () => void;
  setChangeCateogryName: any;
};

const ContainerModal = ({ open, handleClose, addNewCategory, setChangeCateogryName }: ContainerModalProps) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" textAlign="center">
          Add New category
        </Typography>
        <form>
          <TextField id="Email" label="Category Name" variant="outlined" size="small" margin="dense" sx={{ mt: 4 }} fullWidth onChange={(e) => setChangeCateogryName(e.target.value)} />
          <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{}} onClick={addNewCategory}>
            <Button variant="contained" color="success" sx={{ mt: 4, mr: 4 }}>
              Add
            </Button>
            <Button variant="contained" color="warning" sx={{ mt: 4, mr: 'end' }} onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default addCategory;
