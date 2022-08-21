import { render } from '@testing-library/react';

import SMOrderTable from './smorder-table';

describe('SMOrderTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SMOrderTable />);
    expect(baseElement).toBeTruthy();
  });
});
