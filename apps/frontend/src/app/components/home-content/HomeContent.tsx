/* eslint-disable-next-line */
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import contentImage from "../../../assets/imgs/homeimage.png";

interface NavProps {
  handleSignup: () => void;
}

export default function HomeContent(props: NavProps) {
  return (
    <Grid container>
      <Grid item sm={12} md={6}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          sx={{ flexDirection: "column" }}
          style={{ textAlign: "center" }}
        >
          <Typography variant="h2" component="h1" gutterBottom style={{ width: "90%" }}>
            Dynamic Supply Chain Management System
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            style={{ width: "80%" }}
          >
            Software as a service that allows you to define your own supply
            chain structure with an intuitive user interface and manage your
            inventory throughout the supply chain
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              m: 3,
              bgcolor: "#FD8F02",
              ":hover": {
                bgcolor: "#EA6D24"
              }
            }}
            onClick={props.handleSignup}
          >
            GET STARTED
          </Button>
        </Box>
      </Grid>
      <Grid item sm={12} md={6}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <img
            src={contentImage}
            style={{ width: 700 }}
            alt="a lorry at a shop"
          />
        </Box>
      </Grid>
    </Grid>
  );
}
