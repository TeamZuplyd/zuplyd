import { render } from '@testing-library/react';

import LandingFeatures from './landing-features';

describe('LandingFeatures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingFeatures />);
    expect(baseElement).toBeTruthy();
  });
});
