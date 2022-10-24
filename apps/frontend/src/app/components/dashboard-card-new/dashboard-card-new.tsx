import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

/* eslint-disable-next-line */
export interface DashboardCardNewProps {
  title: string;
  value: any;
  imgPath: string;
  top: any;
}

export function DashboardCardNew({ title, value, imgPath, top }: DashboardCardNewProps) {
  return (
    <Card className="dashboard-card" sx={{ boxShadow: '0px 7px 30px rgba(90, 114, 123, 0.1)', m: '20px', display: 'flex', pt: '22px', pl: '22px', borderRadius: '10px', minWidth: 330, width: 330, maxHeight: 120, height: 150 }}>
      <Grid xs={11} sx={{ minWidth: '210px' }}>
        <Typography className="title">{title}</Typography>
        <Typography className="value">{value}</Typography>
      </Grid>

      <Grid xs={1}>
        <img src={imgPath} alt="" style={{ marginTop: '10px', width: '110px' }} />
      </Grid>
    </Card>
  );
}

export default DashboardCardNew;
