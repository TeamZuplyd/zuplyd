import { render } from '@testing-library/react';

import WMlowStocksTable from './wmlow-stocks-table';

describe('WMlowStocksTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WMlowStocksTable />);
    expect(baseElement).toBeTruthy();
  });
});
