import { render } from '@testing-library/react';

import CustomTable from './custom-table';

describe('CustomTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomTable />);
    expect(baseElement).toBeTruthy();
  });
});
