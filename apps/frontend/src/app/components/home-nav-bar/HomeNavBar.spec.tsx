import { render } from '@testing-library/react';

import HomeNavBar from './HomeNavBar';

describe('HomeNavBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeNavBar />);
    expect(baseElement).toBeTruthy();
  });
});
