import { render } from '@testing-library/react';

import CategoryCard from './category-card';

describe('CategoryCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryCard />);
    expect(baseElement).toBeTruthy();
  });
});
