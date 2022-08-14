import { render } from '@testing-library/react';

import ItemSideOver from './item-side-over';

describe('ItemSideOver', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ItemSideOver />);
    expect(baseElement).toBeTruthy();
  });
});
