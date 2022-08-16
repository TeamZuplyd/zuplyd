import { render } from '@testing-library/react';

import IssueTable from './issue-table';

describe('IssueTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IssueTable />);
    expect(baseElement).toBeTruthy();
  });
});
