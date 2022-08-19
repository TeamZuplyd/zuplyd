import { render } from '@testing-library/react';

import IssueForm from './issue-form';

describe('IssueForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IssueForm />);
    expect(baseElement).toBeTruthy();
  });
});
