import { render, screen } from '@testing-library/react';
import { mockComments } from '@/test/mocks/offer';
import ReviewsList from '.';

describe('Component: ReviewsList', () => {
  it('Render', () => {
    render(<ReviewsList comments={mockComments} />);
    expect(screen.getByTestId('component-reviews-list')).toBeInTheDocument();
  });
});
