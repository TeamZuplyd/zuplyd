import { render } from '@testing-library/react';

import ItemSideOverPM from './item-side-over-pm';

describe('ItemSideOverPM', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ItemSideOverPM />);
    expect(baseElement).toBeTruthy();
  });
});
