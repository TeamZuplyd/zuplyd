export const requestedQuotations = [
  {
    id: 1,
    item: 'Biscuits',
    required_by: '2022-10-01',
  },
  {
    id: 2,
    item: 'Soap',
    required_by: '2022-10-15',
  },
];

export const receivedQuotations = [
  {
    id: 1,
    item: 'Shampoo',
    brand: 'Lóreal',
    required_by: '2022-10-01',
    quantity: 100,
    unit_price: 850,
    supplier: 'A K Suppliers',
  },
  {
    id: 2,
    item: 'Noodles',
    brand: 'Prima',
    required_by: '2022-10-15',
    quantity: 100,
    unit_price: 80,
    supplier: 'J M Suppliers',
  },
];

export const placedPO = [
  {
    id: 1,
    item: 'Dhal',
    brand: 'Arpico',
    required_by: '2022-10-01',
    quantity: 100,
    unit_price: 200,
    supplier: 'A K Suppliers',
    placed_date: '2022-08-20',
  },
  {
    id: 2,
    item: 'Chocolate',
    brand: 'Cadbury',
    required_by: '2022-10-15',
    quantity: 50,
    unit_price: 1000,
    supplier: 'J M Suppliers',
    placed_date: '2022-08-20',
  },
];
export const acceptedPO = [
  {
    id: 1,
    item: 'Dhal',
    brand: 'Arpico',
    required_by: '2022-10-01',
    quantity: 100,
    unit_price: 200,
    supplier: 'A K Suppliers',
    placed_date: '2022-08-20',
    accepted_date: '2022-08-21',
    status: 'Pending Delivery',
  },
  {
    id: 2,
    item: 'Chocolate',
    brand: 'Cadbury',
    required_by: '2022-10-15',
    quantity: 50,
    unit_price: 1000,
    supplier: 'J M Suppliers',
    placed_date: '2022-08-20',
    accepted_date: '2022-08-21',
    status: 'On Delivery',
  },
];