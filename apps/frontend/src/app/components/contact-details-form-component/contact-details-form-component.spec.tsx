import { render } from '@testing-library/react';

import ContactDetailsFormComponent from './contact-details-form-component';

describe('ContactDetailsFormComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactDetailsFormComponent />);
    expect(baseElement).toBeTruthy();
  });
});
