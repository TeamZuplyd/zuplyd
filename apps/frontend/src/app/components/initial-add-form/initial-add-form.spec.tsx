import { render } from '@testing-library/react';

import InitialAddForm from './initial-add-form';

describe('InitialAddForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InitialAddForm />);
    expect(baseElement).toBeTruthy();
  });
});
