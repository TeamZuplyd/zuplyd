const status = ['pending', 'cancel', 'complete'];
//request = true -> request from procurement
export const orders = [
  {
    item_code: 'I0001',
    name: 'Soap',
    brand: 'Dettol',
    quantity: 100,
    status: 'Pending',
    required_by: '2022-09-01',
    requested_date: '2022-08-01',
    requested_by: 'S0001',
    request: true,
  },
  {
    item_code: 'I0002',
    name: 'Noodles',
    brand: 'Prima',
    quantity: 50,
    status: 'Pending',
    required_by: '2022-09-15',
    requested_date: '2022-08-01',
    requested_by: 'S0002',
    request: false,
  },
  {
    item_code: 'I0003',
    name: 'Ice Cream',
    brand: 'Elephant House',
    quantity: 100,
    status: 'Pending',
    required_by: '2022-09-01',
    requested_date: '2022-08-01',
    requested_by: 'S0001',
    request: false,
  },
];
