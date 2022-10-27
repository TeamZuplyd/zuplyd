import { render } from '@testing-library/react';

import SMLowStocksTable from './smlow-stocks-table';

describe('SMLowStocksTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SMLowStocksTable />);
    expect(baseElement).toBeTruthy();
  });
});
