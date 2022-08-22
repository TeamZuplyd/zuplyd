import { render } from '@testing-library/react';

import LandingHero from './landing-hero';

describe('LandingHero', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingHero />);
    expect(baseElement).toBeTruthy();
  });
});
