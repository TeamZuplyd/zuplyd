import { render } from '@testing-library/react';

import CompanyAdminCard from './company-admin-card';

describe('CompanyAdminCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompanyAdminCard />);
    expect(baseElement).toBeTruthy();
  });
});
