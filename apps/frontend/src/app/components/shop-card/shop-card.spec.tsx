import { render } from '@testing-library/react';

import ShopCard from './shop-card';

describe('ShopCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShopCard />);
    expect(baseElement).toBeTruthy();
  });
});
