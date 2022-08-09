import { render } from '@testing-library/react';

import HomeContent from './HomeContent';

describe('HomeContent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeContent />);
    expect(baseElement).toBeTruthy();
  });
});
