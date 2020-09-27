import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from '../reducers/transaction.reducers';

export const selectTransactionState = createFeatureSelector<TransactionState>("transaction")

export const selectSortCriteria = createSelector(
    selectTransactionState,
    ({ sortType, sortDescending: sortDescending, ...state }) => ({ sortType, sortDescending })
);