import {
    ActionReducerMap, createReducer, on,
  } from '@ngrx/store';
import { User } from 'src/app/shared/model/user.model';
import { AuthActions } from '../actions';

  
export const featureKey = 'auth';

export interface AuthState {
    user: User;
}

const fromLocalStorage = localStorage.getItem('user');

export const initialAuthState: AuthState = {
    user: !!fromLocalStorage ? JSON.parse(fromLocalStorage) : undefined
};

export const reducer = createReducer(
    initialAuthState,

    on(AuthActions.login, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),

    on(AuthActions.logout, (state, action) => {
        return {
            ...state,
            user: undefined,
        }
    }),
);
