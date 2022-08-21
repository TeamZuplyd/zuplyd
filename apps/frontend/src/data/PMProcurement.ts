export const requestedQuotations = [
  {
    item_code: 1,
    item: 'Biscuits',
    required_by: '2022-10-01',
  },
  {
    item_code: 2,
    item: 'Soap',
    required_by: '2022-10-15',
  },
];

export const receivedQuotations = [
  {
    item_code: 1,
    item: 'Shampoo',
    brand: 'Lóreal',
    required_by: '2022-10-01',
    quantity: 100,
    unit_price: 850,
    supplier: 'A K Suppliers',
  },
  {
    item_code: 2,
    item: 'Shampoo',
    brand: 'Lóreal',
    required_by: '2022-10-01',
    quantity: 100,
    unit_price: 800,
    supplier: 'J M Suppliers',
  },
];

export const placedPO = [
  {
    item_code: 1,
    item: 'Dhal',
    brand: 'Arpico',
    required_by: '2022-10-01',
    quantity: 100,
    unit_price: 200,
    supplier: 'A K Suppliers',
    placed_date: '2022-08-20',
  },
  {
    item_code: 2,
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
    item_code: 1,
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
    item_code: 2,
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