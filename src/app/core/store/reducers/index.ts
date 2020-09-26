import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';


export { reducer as authReducer, featureKey as authFeatureKey } from './auth.reducers';
export { reducer as transactionReducer, featureKey as transactionFeatureKey } from './transaction.reducers';

export const routerFeatureKey = 'router';

export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];


export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action: ', action);

    return reducer(state, action);
  }
}