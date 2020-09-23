import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './core/store/reducers';
import { isLoggedIn, isLoggedOut } from './core/store/selectors/auth.selectors';
import { AuthActions } from './core/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    loading = true;

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(
      private router: Router,
      private store: Store<AppState>,
    ) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });
    
      this.isLoggedIn$ = this.store.pipe(
        select(isLoggedIn)
      );

      this.isLoggedOut$ = this.store.pipe(
        select(isLoggedOut)
      );
    }

    logout() {
      this.store.dispatch(AuthActions.logout());
    }

}
