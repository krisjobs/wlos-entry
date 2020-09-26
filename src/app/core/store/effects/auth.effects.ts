import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { AuthActions } from '../actions';
import { AppState } from '../reducers';
import { isLoggedIn } from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {

    bypassLogin$ = createEffect(
        () => this.store.pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                if (loggedIn && this.router.url === '/') {
                    this.router.navigateByUrl('/transactions')
                }
            }),
            first()
        ),
        { dispatch: false }
    );

    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.login),
            tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
        ),
        { dispatch: false }
    );

    logout$ = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('user');
                localStorage.removeItem('balance');
                this.router.navigateByUrl('/login')
            })
        ),
        { dispatch: false }
    );

    constructor(
        private store: Store<AppState>,
        private actions$: Actions,
        private router: Router,
    ) {

    }


}