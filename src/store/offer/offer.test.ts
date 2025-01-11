import MockAdapter from 'axios-mock-adapter';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { API_ROUTES, createAPI } from '@/api';
import {
  mockOfferNotFoundError,
  mockUnexpectedError,
} from '@/test/mocks/errors';
import {
  mockCommentLong,
  mockComments,
  mockCommentShort,
  mockNearbyOffers,
  mockOffer,
} from '@/test/mocks/offer';
import { extractActionsTypes } from '@/test/utils/redux';
import { AppDispatch, RootState } from '../types';
import {
  fetchOffer,
  postComment,
  setCommentError,
  setComments,
  setNearbyOffers,
  setOffer,
  setOfferError,
  setOfferLoading,
} from './actions';
import { OfferState, offerReducer } from './reducer';

describe('Store slice: "offer', () => {
  const expectedInitialState: OfferState = {
    offer: null,
    comments: [],
    nearbyOffers: [],
    offerLoading: true,
    offerError: null,
    commentError: null,
  };

  describe('Validate initial state', () => {
    it('With empty action', () => {
      const emptyAction: Action = { type: '' };

      const result = offerReducer(expectedInitialState, emptyAction);

      expect(result).toEqual(expectedInitialState);
    });

    it('With undefined state and empty action', () => {
      const emptyAction: Action = { type: '' };

      const result = offerReducer(undefined, emptyAction);

      expect(result).toEqual(expectedInitialState);
    });
  });

  describe('Validate simple actions', () => {
    it('Set offer with "setOffer"', () => {
      const mock = mockOffer;
      const expectedState: OfferState = {
        ...expectedInitialState,
        offer: mock,
      };

      const result = offerReducer(expectedInitialState, setOffer(mock));

      expect(result).toEqual(expectedState);
    });

    it('Set comments with "setComments"', () => {
      const mock = mockComments;
      const expectedState: OfferState = {
        ...expectedInitialState,
        comments: mock,
      };

      const result = offerReducer(expectedInitialState, setComments(mock));

      expect(result).toEqual(expectedState);
    });

    it('Set nearby offers with "setNearbyOffers"', () => {
      const mock = mockNearbyOffers;
      const expectedState: OfferState = {
        ...expectedInitialState,
        nearbyOffers: mock,
      };

      const result = offerReducer(expectedInitialState, setNearbyOffers(mock));

      expect(result).toEqual(expectedState);
    });

    it('Set loading with "setOfferLoading"', () => {
      const mock = false;
      const expectedState: OfferState = {
        ...expectedInitialState,
        offerLoading: mock,
      };

      const result = offerReducer(expectedInitialState, setOfferLoading(mock));

      expect(result).toEqual(expectedState);
    });

    it('Set offer error with "setOfferError"', () => {
      const mock = mockUnexpectedError;
      const expectedState: OfferState = {
        ...expectedInitialState,
        offerError: mock,
      };

      const result = offerReducer(expectedInitialState, setOfferError(mock));

      expect(result).toEqual(expectedState);
    });

    it('Set comment error with "setCommentError"', () => {
      const mock = mockUnexpectedError;
      const expectedState: OfferState = {
        ...expectedInitialState,
        commentError: mock,
      };

      const result = offerReducer(expectedInitialState, setCommentError(mock));

      expect(result).toEqual(expectedState);
    });
  });

  describe('Validata async thunks', () => {
    const api = createAPI();
    const mockAxiosAdapter = new MockAdapter(api);
    const middleware = [thunk.withExtraArgument({ api: api })];
    const mockStoreCreator = configureMockStore<
      RootState,
      PayloadAction,
      AppDispatch
    >(middleware);
    let store: ReturnType<typeof mockStoreCreator>;

    beforeEach(() => {
      store = mockStoreCreator({ offerReducer: expectedInitialState });
      mockAxiosAdapter.resetHandlers();
    });

    describe('Fetch offer, comments and nearby offers with "fetchOffer"', () => {
      it('Expected response', async () => {
        const expectedOffer = mockOffer;
        const expectedComments = mockComments;
        const expectedNearbyOffers = mockNearbyOffers;
        mockAxiosAdapter
          .onGet(API_ROUTES.OFFERS.GET_EXACT(expectedOffer.id))
          .reply(200, expectedOffer);

        mockAxiosAdapter
          .onGet(API_ROUTES.COMMENTS.GET(expectedOffer.id))
          .reply(200, expectedComments);

        mockAxiosAdapter
          .onGet(API_ROUTES.OFFERS.GET_NEARBY(expectedOffer.id))
          .reply(200, expectedNearbyOffers);

        await store.dispatch(fetchOffer(expectedOffer.id));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const offerAction = emittedActions.at(2) as PayloadAction;
        const commentsAction = emittedActions.at(3) as PayloadAction;
        const nearbyOffersAction = emittedActions.at(4) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'offer/fetch/pending',
          'offerLoading/set',
          'offer/set',
          'comments/set',
          'nerbyOffers/set',
          'offerLoading/set',
          'offer/fetch/fulfilled',
        ]);

        expect(offerAction.payload).toEqual(expectedOffer);
        expect(commentsAction.payload).toEqual(expectedComments);
        expect(nearbyOffersAction.payload).toEqual(expectedNearbyOffers);
      });

      it('Unexpected response', async () => {
        const expectedError = mockOfferNotFoundError;

        mockAxiosAdapter
          .onGet(API_ROUTES.OFFERS.GET_EXACT(mockOffer.id))
          .reply(404, expectedError);

        await store.dispatch(fetchOffer(mockOffer.id));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const errorAction = emittedActions.at(2) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'offer/fetch/pending',
          'offerLoading/set',
          'offerError/set',
          'offerLoading/set',
          'offer/fetch/fulfilled',
        ]);

        expect(errorAction.payload).toEqual(expectedError);
      });
    });

    describe('Post comment with "postComment"', () => {
      it('Expected response', async () => {
        const expectedComments = [mockCommentLong];
        mockAxiosAdapter
          .onPost(API_ROUTES.COMMENTS.POST(mockOffer.id))
          .reply(200, mockCommentLong);

        await store.dispatch(
          postComment({ offerId: mockOffer.id, comment: mockCommentShort })
        );

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const commentsAction = emittedActions.at(1) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'comment/post/pending',
          'comments/set',
          'comment/post/fulfilled',
        ]);

        expect(commentsAction.payload).toEqual(expectedComments);
      });

      it('Unexpected response', async () => {
        const expectedError = mockOfferNotFoundError;
        mockAxiosAdapter
          .onPost(API_ROUTES.COMMENTS.POST(mockOffer.id))
          .reply(404, expectedError);

        await store.dispatch(
          postComment({ offerId: mockOffer.id, comment: mockCommentShort })
        );

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const errorAction = emittedActions.at(1) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'comment/post/pending',
          'commentError/set',
          'comment/post/fulfilled',
        ]);

        expect(errorAction.payload).toEqual(expectedError);
      });
    });
  });
});
