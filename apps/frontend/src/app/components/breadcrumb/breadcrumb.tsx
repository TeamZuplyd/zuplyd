/* eslint-disable-next-line */
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export interface BreadcrumbProps {
  tags: string[];
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export function Breadcrumb({ tags }: BreadcrumbProps) {
  return (
    <div style={{ paddingTop: '0.5rem', paddingBottom: '0rem' }} role="presentation" onClick={handleClick}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {tags.map((k) => {
          return (
            <Link underline="hover" color="inherit" href="/">
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </Link>
          );
        })}

        {/* <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          //   style={{paddingLeft:0}}
        >
          Dashboard
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Sales
        </Link> */}
      </Breadcrumbs>
    </div>
  );
}

export default Breadcrumb;
