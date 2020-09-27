import {
    ActionReducerMap, createReducer, on,
  } from '@ngrx/store';
import { User } from 'src/app/shared/model/user.model';
import { SortCriterion } from 'src/app/shared/shared.enums';
import { TransactionActions } from '../actions';

  
export const featureKey = 'transaction';

export interface TransactionState {
    sortType: SortCriterion;
    sortDescending: boolean;
}

export const initialTransactionState: TransactionState = {
    sortType: SortCriterion.Date,
    sortDescending: true
};

export const reducer = createReducer(
    initialTransactionState,

    on(TransactionActions.sortTable, (state, action) => {
        return {
            ...state,
            sortType: action.sortType,
            sortDescending: state.sortType !== action.sortType || !state.sortDescending,
        }
    }),
);
