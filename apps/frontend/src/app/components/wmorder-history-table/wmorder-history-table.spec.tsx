import { render } from '@testing-library/react';

import WMOrderHistoryTable from './wmorder-history-table';

describe('WMOrderHistoryTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WMOrderHistoryTable />);
    expect(baseElement).toBeTruthy();
  });
});
