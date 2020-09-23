import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { TransactionEntityService } from './store/entities/services/transaction-entity.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private $loading = new BehaviorSubject<boolean>(false);
  // this.$loading.asObservable();
  public set loading(value: boolean) { this.$loading.next(value); }
  public get loading() { return this.$loading.getValue(); }
  
  public loading$ = this.$loading.asObservable();
    
  constructor(
    // private userService: UserService,
    private transactionService: TransactionEntityService,
  ) { }

  public registerLoadingObservable(loading$: Observable<boolean>) {
    this.loading$ = merge(
      this.loading$,
      loading$
    );
  }
}
