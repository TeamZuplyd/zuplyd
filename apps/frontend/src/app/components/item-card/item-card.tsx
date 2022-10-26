/* eslint-disable-next-line */
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';

// export interface ItemCardProps {
//   priority?: string;
//   item: string;
//   warehouse: string;
//   quantity: number;
//   requiredBy: string;
//   assigned?: boolean;
// }
//{ priority = 'High', item, warehouse, quantity, requiredBy, assigned = false }

export function ItemCard({ goodsRequest }) {
  const assignProcMan = async () => {
    const userData = localStorage.getItem('userData');
    const proc_id = userData !== null ? JSON.parse(userData)?.user_id : '';

    const assignedGoodsRequest = {
      ...goodsRequest,
      proc_id: proc_id,
      assigned: true,
    };

    await axios.post('http://localhost:5000/api/wh-prcurmnt-sup/update', assignedGoodsRequest);

    // const response = localStorage.getItem('reorderRequests');

    // const parsed_res = response !== null ? JSON.parse(response) : [];

    // parsed_res[3] = assignedGoodsRequest;

    // localStorage.setItem('reorderRequests', JSON.stringify(parsed_res));

    // console.log(parsed_res);
  };

  const sendQuotationRequests = async () => {
    // const response = localStorage.getItem('reorderRequests');

    // const parsed_res = response !== null ? JSON.parse(response) : [];

    // parsed_res[3] = { ...parsed_res[3], status: 1 };

    // localStorage.setItem('reorderRequests', JSON.stringify(parsed_res));

    // console.log('reached');
    // console.log(parsed_res);
    const quotationGoodsRequest = {
      ...goodsRequest,
      status: 1,
    };

    await axios.post('http://localhost:5000/api/wh-prcurmnt-sup/update', quotationGoodsRequest).then((res) => console.log('Updated!'));
  };

  return (
    <Card
      sx={{
        p: 0,
        m: 0,
        minWidth: 370,
        width: 370,
        maxHeight: 200,
        height: 200,
      }}
      style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}
    >
      <CardContent
        sx={{
          p: 0,
          minWidth: 370,
          width: 370,
          maxHeight: 250,
          height: 250,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Grid container wrap="nowrap" sx={{ p: 0 }} justifyContent="space-around" alignItems="center">
          <Grid item xs={11}>
            <Grid sx={{ flexGrow: 1, pl: 2 }} container spacing={2}>
              <Grid item xs={7}>
                <Typography className="secondaryText">Item</Typography>
                <Typography sx={{ wordWrap: 'break-word' }} className="primaryText">
                  {goodsRequest?.item.item_name}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography className="secondaryText">Quantity</Typography>
                <Typography sx={{ wordWrap: 'break-word' }} className="primartText">
                  {goodsRequest?.requiredQuantity + ' pcs'}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography className="secondaryText">Warehouse</Typography>
                <Typography sx={{ wordWrap: 'break-word' }} className="primaryText">
                  {goodsRequest?.warehouse_id}
                </Typography>
              </Grid>
              <Grid item xs={5} alignContent="center">
                <Typography className="secondaryText">Required By</Typography>
                <Typography className="primaryText">{goodsRequest?.requiredDate}</Typography>
              </Grid>
              <Grid item xs={7}>
                {goodsRequest?.assigned && (
                  <Button sx={{ p: 0 }} onClick={sendQuotationRequests}>
                    Request Quotations
                  </Button>
                )}
              </Grid>
              <Grid item xs={5}>
                {(goodsRequest?.assigned && <Button sx={{ p: 0 }}>Unassign</Button>) ||
                  (!goodsRequest?.assigned && (
                    <Button sx={{ p: 0 }} onClick={assignProcMan}>
                      Assign to me
                    </Button>
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            bgcolor={goodsRequest?.priority === 'high' ? '#F60303' : goodsRequest?.priority === 'moderate' ? '#FD8F02' : goodsRequest?.priority === 'low' ? '#24CC08' : 'white'}
            sx={{
              p: 0,
              m: 0,
              maxHeight: 200,
              height: 200,
            }}
          ></Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ItemCard;
