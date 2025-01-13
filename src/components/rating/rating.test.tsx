import { render, screen } from '@testing-library/react';
import Rating from '.';

describe('Component: Rating', () => {
  it('Render', () => {
    render(<Rating value={5} containerClassName="" starsClassName="" />);
    expect(screen.getByTestId('component-rating')).toBeInTheDocument();
  });
});
