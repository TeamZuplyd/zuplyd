import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import {toTitleCase} from '../../../util/stringMethods';
/* eslint-disable-next-line */
export interface CategoryCardProps {
  name: string;
}

export function CategoryCard({ name }: CategoryCardProps) {
  return (
    <Card sx={{ m: 2, width: 250 }}>
      <CardActionArea>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h5" textAlign="center" alignContent="center"sx={{p:2}}>
            {toTitleCase(name)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CategoryCard;
