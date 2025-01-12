import { createSlice } from '@reduxjs/toolkit';
import { APIErrorResponse } from '@/api';
import { OfferShort } from '@/types/offer';
import { UserLong } from '@/types/user';
import {
  setAuthorizationStatus,
  setUserData,
  setUserLoading,
  setFavoriteOffers,
  setFavoriteOffersError,
} from './actions';

type UserDataState = {
  authorizationStatus: boolean;
  userData: UserLong | null;
  userLoading: boolean;
  favoriteOffers: OfferShort[];
  favoriteOffersError: APIErrorResponse | null;
};

const initialState: UserDataState = {
  authorizationStatus: false,
  userData: null,
  userLoading: true,
  favoriteOffers: [],
  favoriteOffersError: null,
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAuthorizationStatus, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setUserData, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(setUserLoading, (state, action) => {
        state.userLoading = action.payload;
      })
      .addCase(setFavoriteOffers, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(setFavoriteOffersError, (state, action) => {
        state.favoriteOffersError = action.payload;
      });
  },
});

export const { reducer: userDataReducer } = userDataSlice;
