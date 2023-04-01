import { createReducer, on } from '@ngrx/store';
import { GlobalStateInterface } from '../models/globalStateInterface';
import * as CommonActions from './actions';
import * as GlobalActions from './actions';
import * as AuthenticationActions from '../../modules/authentication/store/actions';

const initialState: GlobalStateInterface = {
  isLoading: false,
  error: null,
  user: null,
  isLoggedIn: false,
  token: null,
  header: 'map',
  favoritesCount: 0,
};

export const reducers = createReducer(
  initialState,
  on(CommonActions.setHeader, (state, action) => ({
    ...state,
    header: action.header,
  })),
  on(CommonActions.loadingStart, (state) => ({ ...state, isLoading: true })),
  on(CommonActions.loadingEnd, (state) => ({ ...state, isLoading: false })),
  on(CommonActions.gotError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(GlobalActions.checkAuth, (state) => ({ ...state })),
  on(GlobalActions.checkAuthSuccess, (state, action) => ({
    ...state,
    user: action.user,
    isLoggedIn: true,
    token: action.token,
  })),
  on(GlobalActions.checkAuthFailure, (state, action) => ({
    ...state,
    user: null,
    isLoading: false,
    isLoggedIn: false,
    token: null,
    error: action.error,
  })),
  on(AuthenticationActions.logout, (state) => ({
    ...state,
    user: null,
    isLoading: false,
    isLoggedIn: false,
    token: null,
  })),
  on(CommonActions.getFavoritesCountSuccess, (state, action) => ({
    ...state,
    favoritesCount: action.count,
  })),
  on(CommonActions.addFavorites, (state) => ({
    ...state,
    favoritesCount: state.favoritesCount + 1,
  })),
  on(CommonActions.removeFavorites, (state) => ({
    ...state,
    favoritesCount: state.favoritesCount - 1,
  }))
);
