import MockAdapter from 'axios-mock-adapter';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { API_ROUTES, createAPI } from '@/api';
import { TOKEN_HEADER } from '@/constants/token';
import {
  mockAccessDeniedError,
  mockOfferNotFoundError,
  mockValidationError,
} from '@/test/mocks/errors';
import {
  mockCredentials,
  mockFavoriteOffer,
  mockFavoriteOffers,
  mockNonFavoriteOffer,
  mockUserData,
} from '@/test/mocks/user-data';
import { extractActionsTypes } from '@/test/utils/redux';
import { clearToken, getToken, setToken } from '@/utils/user';
import { AppDispatch, RootState } from '../types';
import {
  addFavoriteOffer,
  login,
  logout,
  removeFavoriteOffer,
  setAuthorizationStatus,
  setFavoriteOffers,
  setFavoriteOffersError,
  setUserData,
  setUserLoading,
  validateUser,
} from './actions';
import { UserDataState, userDataReducer } from './reducer';

describe('Store slice: "userData', () => {
  const expectedInitialState: UserDataState = {
    authorizationStatus: false,
    userData: null,
    userLoading: true,
    favoriteOffers: [],
    favoriteOffersError: null,
  };

  describe('Validate initial state', () => {
    it('With empty action', () => {
      const emptyAction: Action = { type: '' };

      const result = userDataReducer(expectedInitialState, emptyAction);

      expect(result).toEqual(expectedInitialState);
    });

    it('With undefined state and empty action', () => {
      const emptyAction: Action = { type: '' };

      const result = userDataReducer(undefined, emptyAction);

      expect(result).toEqual(expectedInitialState);
    });
  });

  describe('Validate simple actions', () => {
    it('Set auth status with "setAuthorizationStatus"', () => {
      const mock = true;
      const expectedState: UserDataState = {
        ...expectedInitialState,
        authorizationStatus: mock,
      };

      const result = userDataReducer(
        expectedInitialState,
        setAuthorizationStatus(mock)
      );

      expect(result).toEqual(expectedState);
    });

    it('Set user data with "setUserData"', () => {
      const mock = mockUserData;
      const expectedState: UserDataState = {
        ...expectedInitialState,
        userData: mock,
      };

      const result = userDataReducer(expectedInitialState, setUserData(mock));

      expect(result).toEqual(expectedState);
    });

    it('Set loading with "setUserLoading"', () => {
      const mock = false;
      const expectedState: UserDataState = {
        ...expectedInitialState,
        userLoading: mock,
      };

      const result = userDataReducer(
        expectedInitialState,
        setUserLoading(mock)
      );

      expect(result).toEqual(expectedState);
    });

    it('Set favorite offers with "setFavoriteOffers"', () => {
      const mock = mockFavoriteOffers;
      const expectedState: UserDataState = {
        ...expectedInitialState,
        favoriteOffers: mockFavoriteOffers,
      };

      const result = userDataReducer(
        expectedInitialState,
        setFavoriteOffers(mock)
      );

      expect(result).toEqual(expectedState);
    });

    it('Set favorite offers error with "setFavoriteOffersError"', () => {
      const mock = mockOfferNotFoundError;
      const expectedState: UserDataState = {
        ...expectedInitialState,
        favoriteOffersError: mock,
      };

      const result = userDataReducer(
        expectedInitialState,
        setFavoriteOffersError(mock)
      );

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
      store = mockStoreCreator({ userDataReducer: expectedInitialState });
      mockAxiosAdapter.resetHandlers();
      clearToken();
    });

    describe('Validate token, fetch user data and favorite offers with "validateUser"', () => {
      it('Valid token', async () => {
        const expectedUserData = mockUserData;
        const expectedFavoriteOffers = mockFavoriteOffers;
        const expectedToken = 'amhvbi5ib2JAbWFpbC5jby51aw==';
        mockAxiosAdapter.onGet(API_ROUTES.USER.VALIDATE).reply((config) => {
          if (
            config.headers &&
            config.headers[TOKEN_HEADER] === expectedToken
          ) {
            return [200, expectedUserData];
          } else {
            return [401, mockAccessDeniedError];
          }
        });

        mockAxiosAdapter
          .onGet(API_ROUTES.FAVORITE.GET)
          .reply(200, expectedFavoriteOffers);

        setToken(expectedToken);
        await store.dispatch(validateUser());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const authorizationStatusAction = emittedActions.at(1) as PayloadAction;
        const userDataAction = emittedActions.at(2) as PayloadAction;
        const favoriteOffersAction = emittedActions.at(3) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'user/validate/pending',
          'authorizationStatus/set',
          'userData/set',
          'favoriteOffers/set',
          'userLoading/set',
          'user/validate/fulfilled',
        ]);

        expect(authorizationStatusAction.payload).toEqual(true);
        expect(userDataAction.payload).toEqual(expectedUserData);
        expect(favoriteOffersAction.payload).toEqual(expectedFavoriteOffers);
      });

      it('Invalid token', async () => {
        const validToken = 'amhvbi5ib2JAbWFpbC5jby51aw==';
        mockAxiosAdapter.onGet(API_ROUTES.USER.VALIDATE).reply((config) => {
          if (config.headers && config.headers[TOKEN_HEADER] === validToken) {
            return [200, mockUserData];
          } else {
            return [401, mockAccessDeniedError];
          }
        });

        mockAxiosAdapter
          .onGet(API_ROUTES.FAVORITE.GET)
          .reply(200, mockFavoriteOffers);

        await store.dispatch(validateUser());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const authorizationStatusAction = emittedActions.at(1) as PayloadAction;
        const userDataAction = emittedActions.at(2) as PayloadAction;
        const favoriteOffersAction = emittedActions.at(3) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'user/validate/pending',
          'authorizationStatus/set',
          'userData/set',
          'favoriteOffers/set',
          'userLoading/set',
          'user/validate/fulfilled',
        ]);

        expect(authorizationStatusAction.payload).toEqual(false);
        expect(userDataAction.payload).toEqual(null);
        expect(favoriteOffersAction.payload).toEqual([]);
      });
    });

    describe('Login user with "login"', () => {
      it('Valid credentials', async () => {
        const expectedUserData = mockUserData;
        const expectedFavoriteOffers = mockFavoriteOffers;
        mockAxiosAdapter.onPost(API_ROUTES.USER.LOGIN).reply(200, mockUserData);
        mockAxiosAdapter
          .onGet(API_ROUTES.FAVORITE.GET)
          .reply(200, mockFavoriteOffers);

        await store.dispatch(login(mockCredentials));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const authorizationStatusAction = emittedActions.at(2) as PayloadAction;
        const userDataAction = emittedActions.at(3) as PayloadAction;
        const favoriteOffersAction = emittedActions.at(4) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'user/login/pending',
          'userLoading/set',
          'authorizationStatus/set',
          'userData/set',
          'favoriteOffers/set',
          'userLoading/set',
          'user/login/fulfilled',
        ]);

        expect(authorizationStatusAction.payload).toEqual(true);
        expect(userDataAction.payload).toEqual(expectedUserData);
        expect(favoriteOffersAction.payload).toEqual(expectedFavoriteOffers);
      });

      it('Invalid credentials', async () => {
        const expectedError = mockValidationError;
        mockAxiosAdapter
          .onPost(API_ROUTES.USER.LOGIN)
          .reply(400, expectedError);
        mockAxiosAdapter
          .onGet(API_ROUTES.FAVORITE.GET)
          .reply(200, mockFavoriteOffers);

        await store.dispatch(login({ email: '', password: '' }));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const authorizationStatusAction = emittedActions.at(2) as PayloadAction;
        const userDataAction = emittedActions.at(3) as PayloadAction;
        const favoriteOffersAction = emittedActions.at(4) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'user/login/pending',
          'userLoading/set',
          'authorizationStatus/set',
          'userData/set',
          'favoriteOffers/set',
          'userLoading/set',
          'user/login/fulfilled',
        ]);

        expect(authorizationStatusAction.payload).toEqual(false);
        expect(userDataAction.payload).toEqual(null);
        expect(favoriteOffersAction.payload).toEqual([]);
      });
    });

    it('Log out user with "logout"', async () => {
      const mockToken = 'amhvbi5ib2JAbWFpbC5jby51aw==';
      mockAxiosAdapter.onDelete(API_ROUTES.USER.LOGOUT).reply(204);

      setToken(mockToken);
      await store.dispatch(logout());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const authorizationStatusAction = emittedActions.at(2) as PayloadAction;
      const userDataAction = emittedActions.at(3) as PayloadAction;
      const favoriteOffersAction = emittedActions.at(4) as PayloadAction;

      expect(extractedActionsTypes).toEqual([
        'user/logout/pending',
        'userLoading/set',
        'authorizationStatus/set',
        'userData/set',
        'favoriteOffers/set',
        'userLoading/set',
        'user/logout/fulfilled',
      ]);

      expect(getToken()).toEqual('');
      expect(authorizationStatusAction.payload).toEqual(false);
      expect(userDataAction.payload).toEqual(null);
      expect(favoriteOffersAction.payload).toEqual([]);
    });

    describe('Add offer to favorites with "addFavoriteOffer"', () => {
      it('Valid offer', async () => {
        const expectedOffer = mockFavoriteOffer;
        mockAxiosAdapter
          .onPost(API_ROUTES.FAVORITE.SET(expectedOffer.id, '1'))
          .reply(201, expectedOffer);

        let result: boolean | undefined;
        await store
          .dispatch(addFavoriteOffer(mockNonFavoriteOffer))
          .unwrap()
          .then((res) => {
            result = res;
          });
        if (result === undefined) {
          result = false;
        }

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const favoriteOffersAction = emittedActions.at(1) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'favoriteOffers/add/pending',
          'favoriteOffers/set',
          'favoriteOffers/add/fulfilled',
        ]);

        expect(result).toEqual(true);
        expect(favoriteOffersAction.payload).toEqual([expectedOffer]);
      });

      it('Invalid offer', async () => {
        const expectedError = mockOfferNotFoundError;
        const expectedOffer = mockFavoriteOffer;
        mockAxiosAdapter
          .onPost(API_ROUTES.FAVORITE.SET(expectedOffer.id, '1'))
          .reply(404, expectedError);

        let result: boolean | undefined;
        await store
          .dispatch(addFavoriteOffer(mockNonFavoriteOffer))
          .unwrap()
          .then((res) => {
            result = res;
          });
        if (result === undefined) {
          result = true;
        }

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const favoriteOffersErrorAction = emittedActions.at(1) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'favoriteOffers/add/pending',
          'favoriteOffersError/set',
          'favoriteOffers/add/fulfilled',
        ]);

        expect(result).toEqual(false);
        expect(favoriteOffersErrorAction.payload).toEqual(expectedError);
      });
    });

    describe('Remove offer from favorites with "removeFavoriteOffer"', () => {
      it('Valid offer', async () => {
        const expectedOffer = mockNonFavoriteOffer;
        mockAxiosAdapter
          .onPost(API_ROUTES.FAVORITE.SET(expectedOffer.id, '0'))
          .reply(200, expectedOffer);

        let result: boolean | undefined;
        await store
          .dispatch(removeFavoriteOffer(mockFavoriteOffer))
          .unwrap()
          .then((res) => {
            result = res;
          });
        if (result === undefined) {
          result = false;
        }

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const favoriteOffersAction = emittedActions.at(1) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'favoriteOffers/remove/pending',
          'favoriteOffers/set',
          'favoriteOffers/remove/fulfilled',
        ]);

        expect(result).toEqual(true);
        expect(favoriteOffersAction.payload).toEqual([]);
      });

      it('Invalid offer', async () => {
        const expectedError = mockOfferNotFoundError;
        const expectedOffer = mockNonFavoriteOffer;
        mockAxiosAdapter
          .onPost(API_ROUTES.FAVORITE.SET(expectedOffer.id, '0'))
          .reply(404, expectedError);

        let result: boolean | undefined;
        await store
          .dispatch(removeFavoriteOffer(mockFavoriteOffer))
          .unwrap()
          .then((res) => {
            result = res;
          });
        if (result === undefined) {
          result = true;
        }

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const favoriteOffersErrorAction = emittedActions.at(1) as PayloadAction;

        expect(extractedActionsTypes).toEqual([
          'favoriteOffers/remove/pending',
          'favoriteOffersError/set',
          'favoriteOffers/remove/fulfilled',
        ]);

        expect(result).toEqual(false);
        expect(favoriteOffersErrorAction.payload).toEqual(expectedError);
      });
    });
  });
});
