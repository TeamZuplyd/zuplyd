import { render } from '@testing-library/react';

import ButtonGroup from './button-group';

describe('ButtonGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonGroup />);
    expect(baseElement).toBeTruthy();
  });
});
