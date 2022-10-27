import { render } from '@testing-library/react';

import SMAllItemsTable from './small-items-table';

describe('SMAllItemsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SMAllItemsTable />);
    expect(baseElement).toBeTruthy();
  });
});
