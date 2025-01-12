import { render, screen } from '@testing-library/react';
import { mockCommentLong } from '@/test/mocks/offer';
import Review from '.';

describe('Component: Review', () => {
  it('Render', () => {
    render(<Review comment={mockCommentLong} />);
    expect(screen.getByTestId('component-review')).toBeInTheDocument();
  });
});
