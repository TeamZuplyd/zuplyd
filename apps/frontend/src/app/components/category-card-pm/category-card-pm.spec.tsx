import { render } from '@testing-library/react';

import CategoryCardPM from './category-card-pm';

describe('CategoryCardPM', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryCardPM />);
    expect(baseElement).toBeTruthy();
  });
});
