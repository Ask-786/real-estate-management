import { createReducer, on } from '@ngrx/store';
import { GlobalStateInterface } from '../models/globalStateInterface';
import { GlobalActions } from './actions';
import * as AuthenticationActions from '../../modules/authentication/store/actions';
import * as NotificationActions from '../../modules/notifications/store/actions';

const initialState: GlobalStateInterface = {
  isLoading: false,
  error: null,
  user: null,
  isLoggedIn: false,
  token: null,
  header: 'map',
  favoritesCount: 0,
  notificatiosCount: 0,
};

export const reducers = createReducer(
  initialState,
  on(GlobalActions.setHeader, (state, action) => ({
    ...state,
    header: action.header,
  })),
  on(GlobalActions.loadingStart, (state) => ({ ...state, isLoading: true })),
  on(GlobalActions.loadingEnd, (state) => ({ ...state, isLoading: false })),
  on(GlobalActions.gotError, (state, action) => ({
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
  on(GlobalActions.getFavoritesCountSuccess, (state, action) => ({
    ...state,
    favoritesCount: action.count,
  })),
  on(GlobalActions.addFavorites, (state) => ({
    ...state,
    favoritesCount: state.favoritesCount + 1,
  })),
  on(GlobalActions.removeFavorites, (state) => ({
    ...state,
    favoritesCount: state.favoritesCount - 1,
  })),
  on(GlobalActions.getNotificationsCountSuccess, (state, action) => ({
    ...state,
    notificatiosCount: action.count,
  })),
  on(NotificationActions.changeReadStatusSuccess, (state) => {
    let change = 0 as number;
    if (state.notificatiosCount > 0) {
      change = 1;
    }
    return {
      ...state,
      notificatiosCount: state.notificatiosCount - change,
    };
  })
);
