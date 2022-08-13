import { render } from '@testing-library/react';

import OrderTable from './order-table';

describe('OrderTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderTable />);
    expect(baseElement).toBeTruthy();
  });
});
