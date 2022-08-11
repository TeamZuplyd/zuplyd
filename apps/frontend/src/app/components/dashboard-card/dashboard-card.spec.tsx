import { render } from '@testing-library/react';

import DashboardCard from './dashboard-card';

describe('DashboardCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DashboardCard />);
    expect(baseElement).toBeTruthy();
  });
});
