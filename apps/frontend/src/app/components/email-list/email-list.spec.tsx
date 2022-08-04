import { render } from '@testing-library/react';

import EmailList from './email-list';

describe('EmailList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmailList />);
    expect(baseElement).toBeTruthy();
  });
});
