import { render } from '@testing-library/react';

import LandingPricing from './landing-pricing';

describe('LandingPricing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingPricing />);
    expect(baseElement).toBeTruthy();
  });
});
