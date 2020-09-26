import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Beneficiary } from 'src/app/shared/model';
import { BENEFICIARIES } from 'src/assets/db-data';

@Injectable()
export class BeneficiaryDataService extends DefaultDataService<Beneficiary>{

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Beneficiary', http, httpUrlGenerator);
    }

    getAll(): Observable<Beneficiary[]> {
        // return this.http.get('/api/beneficiaries/').pipe(map(payload => ...))
        return from([BENEFICIARIES]).pipe(
            // delay(2000), // artificial delay
        )
    }
}