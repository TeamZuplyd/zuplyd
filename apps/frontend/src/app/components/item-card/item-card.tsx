/* eslint-disable-next-line */
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';

export interface ItemCardProps {
  urgencyLevel?: string;
  item: string;
  warehouse: string;
  quantity: number;
  requiredBy: string;
  assigned?: boolean;
}

export function ItemCard({ urgencyLevel = 'High', item, warehouse, quantity, requiredBy, assigned = false }: ItemCardProps) {
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
                  {item}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography className="secondaryText">Quantity</Typography>
                <Typography sx={{ wordWrap: 'break-word' }} className="primartText">
                  {quantity + ' pcs'}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography className="secondaryText">Warehouse</Typography>
                <Typography sx={{ wordWrap: 'break-word' }} className="primaryText">
                  {warehouse}
                </Typography>
              </Grid>
              <Grid item xs={5} alignContent="center">
                <Typography className="secondaryText">Required By</Typography>
                <Typography className="primaryText">{requiredBy}</Typography>
              </Grid>
              <Grid item xs={7}>
                {assigned && <Button sx={{ p: 0 }}>Request Quotations</Button>}
              </Grid>
              <Grid item xs={5}>
                {(assigned && <Button sx={{ p: 0 }}>Unassign</Button>) || (!assigned && <Button sx={{ p: 0 }}>Assign to me</Button>)}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            bgcolor={urgencyLevel === 'High' ? '#F60303' : urgencyLevel === 'Moderate' ? '#FD8F02' : urgencyLevel === 'Normal' ? '#24CC08' : 'white'}
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
