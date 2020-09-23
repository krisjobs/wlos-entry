import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { debounceTime, filter, first, map, tap } from 'rxjs/operators';
import { CoreService } from 'src/app/core/core.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { USERS } from 'src/assets/db-data';

@Injectable()
export class TransactionsResolver implements Resolve<boolean> {

    constructor(
        private transactionsService: TransactionEntityService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.transactionsService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.transactionsService.getAll();
                }
            }),
            filter(loaded => !!loaded),
            first()
        )
    }
}