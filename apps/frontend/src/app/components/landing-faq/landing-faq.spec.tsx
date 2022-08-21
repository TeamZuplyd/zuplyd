import { render } from '@testing-library/react';

import LandingFaq from './landing-faq';

describe('LandingFaq', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LandingFaq />);
    expect(baseElement).toBeTruthy();
  });
});
