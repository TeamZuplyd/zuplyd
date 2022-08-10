import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-around"
          direction="column"
          padding="3rem"
    >
      <Grid item padding={5}>
        <img src="../../assets/svg/404.svg" alt="" style={{ width: 500 }} />
      </Grid>
      <Grid item padding={5}>
        <Link to="/">
          <Button
            variant="contained" style={{ backgroundColor: '#fd8f02' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              height="20"
              width="20"
              style={{ marginRight: 10 }}
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Back to Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
