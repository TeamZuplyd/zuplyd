import { render } from '@testing-library/react';

import AppRoute from './app-route';

describe('AppRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppRoute />);
    expect(baseElement).toBeTruthy();
  });
});
