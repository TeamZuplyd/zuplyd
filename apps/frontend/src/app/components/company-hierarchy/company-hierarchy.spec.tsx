import { render } from '@testing-library/react';

import CompanyHierarchy from './company-hierarchy';

describe('CompanyHierarchy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CompanyHierarchy />);
    expect(baseElement).toBeTruthy();
  });
});
