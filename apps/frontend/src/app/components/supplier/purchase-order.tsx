import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const steps = ['Review Quotation', 'Review Purchase Order', 'Order Completion'];

export default function PurchaseOrder({ setSelectedStep, selectedStep }) {
  const isStepFailed = (step) => {
    return step === 1;
  };

  return (
    <Box sx={{ width: '100%', marginBottom: 5 }}>
      <Stepper activeStep={selectedStep}>
        {steps.map((label, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
