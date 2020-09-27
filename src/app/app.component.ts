import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './core/store/reducers';
import { isLoggedIn, isLoggedOut } from './core/store/selectors/auth.selectors';
import { AuthActions } from './core/store/actions';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loading$ = this.coreService.loading$;


  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(
    // private router: Router,
    private coreService: CoreService,
    private store: Store<AppState>,
  ) {

  }

  ngOnInit() {

    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    );

    this.isLoggedOut$ = this.store.pipe(
      select(isLoggedOut)
    );

    document.body.classList.add('bg-img');
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
