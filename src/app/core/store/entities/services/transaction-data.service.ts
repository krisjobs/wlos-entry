import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Transaction } from 'src/app/shared/model';
import { TRANSACTIONS } from 'src/assets/db-data';

@Injectable()
export class TransactionDataService extends DefaultDataService<Transaction>{

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Transaction', http, httpUrlGenerator);
    }

    getAll(): Observable<Transaction[]> {
        // return this.http.get('/api/transactions/').pipe(map(payload => ...))
        return from([TRANSACTIONS]).pipe(
            delay(500), // artificial delay
        )
    }
}