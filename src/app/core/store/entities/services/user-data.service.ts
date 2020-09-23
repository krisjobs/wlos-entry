import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { from, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/model';
import { USERS } from 'src/assets/db-data';

@Injectable()
export class UserDataService extends DefaultDataService<User>{

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('User', http, httpUrlGenerator);
    }

    getAll(): Observable<User[]> {
        // return this.http.get('/api/users/').pipe(map(payload => ...))
        return from([USERS]).pipe(
        )
    }
}