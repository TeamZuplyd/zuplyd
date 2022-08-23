import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { toTitleCase } from '../../../util/stringMethods';
/* eslint-disable-next-line */
export interface CategoryCardProps {
  name: string;
}

export function CategoryCard({ name }: CategoryCardProps) {
  return (
    <Card sx={{ m: 2, width: 250 }} style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      <CardActionArea>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h5" textAlign="center" alignContent="center" sx={{ p: 2 }}>
            {toTitleCase(name)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
