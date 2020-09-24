import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';

@Injectable()
export class TransactionResolver implements Resolve<boolean> {

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