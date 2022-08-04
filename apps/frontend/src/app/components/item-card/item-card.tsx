/* eslint-disable-next-line */
import { Card, CardContent, Grid, Typography } from '@mui/material';

export interface ItemCardProps {
  urgencyLevel?: string;
  item: string;
  warehouse: string;
  quantity: number;
}

export function ItemCard({
  urgencyLevel = 'High',
  item,
  warehouse,
  quantity,
}: ItemCardProps) {
  return (
    <Card
      sx={{
        p: 0,
        m: 1,
        minWidth: 370,
        width: 370,
        maxHeight: 200,
        height: 200,
      }}
    >
      <CardContent
        sx={{
          p: 0,
          minWidth: 370,
          width: 370,
          maxHeight: 200,
          height: 200,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <Grid
          container
          wrap="nowrap"
          sx={{ p: 0 }}
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={11}>
            <Grid sx={{ flexGrow: 1, pl: 2 }} container spacing={2}>
              <Grid item xs={8}>
                <Typography className="secondaryText">Item</Typography>
                <Typography className="primaryText">{item} </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className="secondaryText">Quantity</Typography>
                <Typography className="primartText">
                  {quantity + ' pcs'}
                </Typography>
              </Grid>
              <Grid item sx={{ alignItems: 'flex-start' }} xs={12}>
                <Typography className="secondaryText">Warehouse</Typography>
                <Typography className="primaryText">{warehouse}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            bgcolor={
              urgencyLevel === 'High'
                ? '#F60303'
                : urgencyLevel === 'Moderate'
                ? '#FD8F02'
                : urgencyLevel === 'Normal'
                ? '#24CC08'
                : 'white'
            }
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
