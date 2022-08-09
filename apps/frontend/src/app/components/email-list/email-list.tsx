import { Box, CardContent, Grid } from '@mui/material';

/* eslint-disable-next-line */
export interface EmailListProps {
  emails: string[];
  handleDelete: (index:number) => void;
}

export function EmailList({ emails,handleDelete }: EmailListProps) {
  return (
    <CardContent
      sx={{
        // '&:last-child': {
        //   paddingBottom: 0,
        // },
        p:0,
      }}
    >
      {emails.map((email, index) => {
        return (
          <Box sx={{ m: 1, fontSize: '14px' }} key={index}>
            <Grid container>
              <Grid item xs={1}>
                #{index + 1}
              </Grid>
              <Grid item xs={10}>
                {email}
              </Grid>
              <Grid item xs={1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="12"
                  height="12"
                  viewBox="0 0 48 48"
                  fill="#000000;"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(index)}
                >
                  <path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z"></path>
                </svg>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </CardContent>
  );
}

export default EmailList;
