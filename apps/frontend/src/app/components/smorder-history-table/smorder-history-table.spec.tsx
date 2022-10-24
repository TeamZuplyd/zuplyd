import { render } from '@testing-library/react';

import SMorderHistoryTable from './smorder-history-table';

describe('SMorderHistoryTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SMorderHistoryTable />);
    expect(baseElement).toBeTruthy();
  });
});
