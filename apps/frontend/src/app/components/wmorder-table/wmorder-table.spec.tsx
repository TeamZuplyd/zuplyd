import { render } from '@testing-library/react';

import WMOrderTable from './wmorder-table';

describe('WMOrderTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WMOrderTable />);
    expect(baseElement).toBeTruthy();
  });
});
