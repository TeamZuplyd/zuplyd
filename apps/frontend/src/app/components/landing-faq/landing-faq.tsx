import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface LandingFaqProps {}

export function LandingFaq(props: LandingFaqProps) {
  return (
    <div style={{backgroundColor:"#fff", width:"100%"}}>
    <Container maxWidth="lg" id="faq" sx={{bgcolor:"#FFF"}}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          pb:"30px",
          bgcolor:"#FFF"
        }}
      >
        <span style={{color:"#FA541C", fontSize:"12px", margin:"30px", fontWeight: 600}}>FAQ</span>
        <Typography variant="h3" component="h3" gutterBottom style={{ fontWeight: 700, fontSize:"48px"}}>
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          component="p"
          style={{ width: "35%", color:"#637381" }}
          align="center"
        >
          We've found the answers to your most frequently asked questions
        </Typography>
        <div style={{width:"60%"}}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What is a Supply Chain Management System?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              A Supply Chain Management System is a system that manages the flow of goods and services between businesses and locations.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Why Supply Chain is a Pain?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Lack of planning in stock levels up and downstream leads to shortages <br />

              Out of stocks lead the customer to substitute brands or move to a competitor<br />

              Inability to track and trace products
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>What includes in a supply chain management system?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Movement and storage of raw materials <br />
              Management of inventories <br />
              Management of goods <br />
              End-to-end order fulfillment
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Why zuplyd?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              There is no proper software as a service that allows users customize the supply chain in an intuitive manner <br />
              There is no affordable software that bridges the users in the supply chain and that can dynamically set rules for the inventory<br />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Is zuplyd reliable?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                System is following good development practices and meant to evolve and meet customer demands arising in the future
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
    </Container>
    </div>
  );
}

export default LandingFaq;
