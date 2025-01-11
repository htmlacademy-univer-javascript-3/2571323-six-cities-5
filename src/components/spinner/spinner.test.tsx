import { render, screen } from '@testing-library/react';
import Spinner from '.';

describe('Component: Spinner', () => {
  it('Render', () => {
    render(<Spinner variant="page" />);
    expect(screen.getByTestId('component-spinner')).toBeInTheDocument();
  });
});
