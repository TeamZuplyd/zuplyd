/* eslint-disable-next-line */
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Breadcrumb from '../breadcrumb/breadcrumb';
import { BellIcon } from '@heroicons/react/outline';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 100,
  },
}));

export interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            height: '90px',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            background: '#FFFFFF',
          }}
        >
          <StyledToolbar>
            {/* <Breadcrumb /> */}

            {/* <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'flex-end' }}
              color="#4B5563"
            >
              <Breadcrumb/>
              {title}
            </Typography> */}

            <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, alignSelf: 'center', fontWeight: 500, fontSize: '35px', fontStyle: 'Poppins', color: '#1F2937' }} color="#4B5563">
              {title}
            </Typography>

            <BellIcon
              style={{
                minWidth: '24px',
                maxHeight: '100%',
                maxWidth: '20px',
                paddingTop: '1rem',
                color: '#4B5563',
                // marginTop: "auto",
                // paddingLeft: "2rem",
              }}
            />
          </StyledToolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Header;
