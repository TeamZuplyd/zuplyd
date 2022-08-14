import { render } from '@testing-library/react';

import OrderForm from './order-form';

describe('OrderForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderForm />);
    expect(baseElement).toBeTruthy();
  });
});
