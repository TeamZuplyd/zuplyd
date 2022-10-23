import { render } from '@testing-library/react';

import PMraisedIssueTable from './pmraised-issue-table';

describe('PMraisedIssueTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PMraisedIssueTable />);
    expect(baseElement).toBeTruthy();
  });
});
