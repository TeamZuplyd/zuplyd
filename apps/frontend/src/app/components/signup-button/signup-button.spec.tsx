import { render } from '@testing-library/react';

import SignupButton from './signup-button';

describe('SignupButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignupButton />);
    expect(baseElement).toBeTruthy();
  });
});
