import { render } from '@testing-library/react';

import DashboardCardNew from './dashboard-card-new';

describe('DashboardCardNew', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardCardNew />);
    expect(baseElement).toBeTruthy();
  });
});
