import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private $loading = new BehaviorSubject<boolean>(false);
  public set loading(value: boolean) { this.$loading.next(value); }
  public get loading() { return this.$loading.getValue(); }

  public _loading$ = this.$loading.asObservable()
  public get loading$() { return this._loading$ };

  constructor(
  ) { }

  public registerLoadingObservable(loading$: Observable<boolean>) {
    this._loading$ = merge(
      this._loading$,
      loading$
    );
  }
}
