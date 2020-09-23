import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { createEffect } from '@ngrx/effects';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private $loading = new BehaviorSubject<boolean>(false);
  public set loading(value: boolean) { this.$loading.next(value); }
  public get loading() { return this.$loading.getValue(); }

  public loading$ = this.$loading.asObservable()

  login$ = createEffect(
    () => this.router.events.pipe(
      tap(event => {
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
      })
    ),
    { dispatch: false }
  );

  constructor(
    private router: Router,
  ) { }
}

// this.router.events.subscribe(event => {
//   
// });
