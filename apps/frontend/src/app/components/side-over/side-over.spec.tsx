import { render } from '@testing-library/react';

import SideOver from './side-over';

describe('SideOver', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SideOver />);
    expect(baseElement).toBeTruthy();
  });
});
