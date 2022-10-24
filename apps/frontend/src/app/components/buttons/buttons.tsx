import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

/* eslint-disable-next-line */

export function GoBackButton() {
  return (
    <Button size="small" startIcon={<ArrowBackIosNewIcon />} className="goBack">
      Go Back
    </Button>
  );
}

export function ContactNoButton({ value, onClickFunc }) {
  return (
    <span>
      <Button
        size="small"
        className="spanBtn"
        onClick={() => {
          onClickFunc(value);
        }}
        endIcon={<CloseIcon />}
      >
        {value}
      </Button>
    </span>
  );
}
