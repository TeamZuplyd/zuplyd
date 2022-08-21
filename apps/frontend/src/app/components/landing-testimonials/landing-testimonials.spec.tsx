import { render } from '@testing-library/react';

import LandingTestimonials from './landing-testimonials';

describe('LandingTestimonials', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingTestimonials />);
    expect(baseElement).toBeTruthy();
  });
});
