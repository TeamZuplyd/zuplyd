import { render } from '@testing-library/react';

import FormComponent from './form-component';

describe('FormComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormComponent />);
    expect(baseElement).toBeTruthy();
  });
});
