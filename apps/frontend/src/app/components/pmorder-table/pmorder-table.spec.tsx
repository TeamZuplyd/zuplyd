import { render } from '@testing-library/react';

import PMOrderTable from './pmorder-table';

describe('PMOrderTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PMOrderTable />);
    expect(baseElement).toBeTruthy();
  });
});
