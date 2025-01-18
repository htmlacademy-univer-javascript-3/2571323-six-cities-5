import { render, screen } from '@testing-library/react';
import { mockCommentList } from '../../mocks/storeMock.ts';
import ReviewList from './ReviewList.tsx';

describe('Component: Loading page', () => {
  it('should render correctly', () => {
    const reviewListTestId = 'reviews-list';
    const expectedText = /Reviews/i;

    render(<ReviewList guestReviews={mockCommentList}/>);

    const reviewList = screen.getByTestId(reviewListTestId);

    expect(reviewList).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });
});
