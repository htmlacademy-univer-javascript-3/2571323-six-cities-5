import MockAdapter from 'axios-mock-adapter';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { API_ROUTES, createAPI } from '@/api';
import { mockUnexpectedError, mockUnknownError } from '@/test/mocks/errors';
import { mockGlobalOffers } from '@/test/mocks/global-offers';
import { extractActionsTypes } from '@/test/utils/redux';
import { AppDispatch, RootState } from '../types';
import { fetchGlobalOffers, setError, setLoading, setOffers } from './actions';
import { GlobalOffersState, globalOffersReducer } from './reducer';

describe('Store slice: "globalOffers"', () => {
  const expectedInitialState: GlobalOffersState = {
    offers: [],
    loading: true,
    error: null,
  };

  describe('Validate initial state', () => {
    it('With empty action', () => {
      const emptyAction: Action = { type: '' };

      const result = globalOffersReducer(expectedInitialState, emptyAction);

      expect(result).toEqual(expectedInitialState);
    });

    it('With undefined state and empty action', () => {
      const emptyAction: Action = { type: '' };

      const result = globalOffersReducer(undefined, emptyAction);

      expect(result).toEqual(expectedInitialState);
    });
  });

  describe('Validate simple actions', () => {
    it('Set global offers with "setOffers"', () => {
      const mockOffers = mockGlobalOffers;
      const expectedState: GlobalOffersState = {
        ...expectedInitialState,
        offers: mockOffers,
      };

      const result = globalOffersReducer(
        expectedInitialState,
        setOffers(mockOffers)
      );

      expect(result).toEqual(expectedState);
    });

    it('Set loading with "setLoading"', () => {
      const mockLoading = false;
      const expectedState: GlobalOffersState = {
        ...expectedInitialState,
        loading: mockLoading,
      };

      const result = globalOffersReducer(
        expectedInitialState,
        setLoading(mockLoading)
      );

      expect(result).toEqual(expectedState);
    });

    it('Set error with "setError"', () => {
      const mockError = mockUnexpectedError;
      const expectedState: GlobalOffersState = {
        ...expectedInitialState,
        error: mockError,
      };

      const result = globalOffersReducer(
        expectedInitialState,
        setError(mockError)
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('Validate async thunks', () => {
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
      store = mockStoreCreator({ globalOffersReducer: expectedInitialState });
      mockAxiosAdapter.resetHandlers();
    });

    describe('Fetch global offers with "fetchGlobalOffers"', () => {
      it('Expected response', async () => {
        const expectedOffers = mockGlobalOffers;
        mockAxiosAdapter
          .onGet(API_ROUTES.OFFERS.GET_GLOBAL)
          .reply(200, expectedOffers);

        await store.dispatch(fetchGlobalOffers());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const offersAction = emittedActions.at(2) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'globalOffers/fetch/pending',
          'globalOffersLoading/set',
          'globalOffers/set',
          'globalOffersLoading/set',
          'globalOffers/fetch/fulfilled',
        ]);

        expect(offersAction.payload).toEqual(expectedOffers);
      });

      it('Unexpected response', async () => {
        const expectedError = mockUnknownError;

        mockAxiosAdapter.onGet(API_ROUTES.OFFERS.GET_GLOBAL).reply(500);

        await store.dispatch(fetchGlobalOffers());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const errorAction = emittedActions.at(2) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'globalOffers/fetch/pending',
          'globalOffersLoading/set',
          'globalOffersError/set',
          'globalOffersLoading/set',
          'globalOffers/fetch/fulfilled',
        ]);

        expect(errorAction.payload).toEqual(expectedError);
      });
    });
  });
});
