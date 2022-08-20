import { render } from '@testing-library/react';

import LandingNavBar from './landing-nav-bar';

describe('LandingNavBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingNavBar />);
    expect(baseElement).toBeTruthy();
  });
});
