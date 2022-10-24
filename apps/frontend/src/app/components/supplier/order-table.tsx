import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ReactNode } from 'react';

function createData(orderId: string, customer: string, order: string, delivery_date: string, delivery_pricing: number, delivery_status: ReactNode) {
  return { orderId, customer, order, delivery_date, delivery_pricing, delivery_status };
}

const rows = [createData('ORD22233123565', 'Sanka Gallage', 'Nike Air Max', '2022/01/05', 544.0, <Chip variant="outlined" label="Cancelled" color="error" />), createData('ORD22233123567', 'Sanka Gallage', 'Nike Air Max', '2022/01/05', 544.0, <Chip variant="outlined" label="Cancelled" color="error" />), createData('ORD22233123561', 'Sanka Gallage', 'Nike Air Max', '2022/01/05', 544.0, <Chip variant="outlined" label="Cancelled" color="error" />), createData('ORD22233123562', 'Sanka Gallage', 'Nike Air Max', '2022/01/05', 544.0, <Chip variant="outlined" label="Cancelled" color="error" />), createData('ORD22233123564', 'Sanka Gallage', 'Nike Air Max', '2022/01/05', 544.0, <Chip variant="outlined" label="Cancelled" color="error" />)];

export default function OrderTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ borderRadius: '32px' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'var(--theme-gray)', color: 'white' }}>
            <TableCell sx={{ color: 'white' }}>Order ID</TableCell>
            <TableCell sx={{ color: 'white' }} align="left">
              Customer
            </TableCell>
            <TableCell sx={{ color: 'white' }} align="left">
              Order
            </TableCell>
            <TableCell sx={{ color: 'white' }} align="center">
              Delivery Date
            </TableCell>
            <TableCell sx={{ color: 'white' }} align="right">
              Delivery Pricing&nbsp;($)
            </TableCell>
            <TableCell sx={{ color: 'white' }} align="center">
              Delivery Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={row.orderId} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }} onClick={() => console.log(row.orderId)}>
              <TableCell component="th" scope="row">
                {row.orderId}
              </TableCell>
              <TableCell align="left">{row.customer}</TableCell>
              <TableCell align="left">{row.order}</TableCell>
              <TableCell align="center">{row.delivery_date}</TableCell>
              <TableCell align="right">{row.delivery_pricing}</TableCell>
              <TableCell align="center">{row.delivery_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
