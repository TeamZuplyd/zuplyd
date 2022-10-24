import { render } from '@testing-library/react';

import InitLayout from './init-layout';

describe('InitLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InitLayout />);
    expect(baseElement).toBeTruthy();
  });
});
