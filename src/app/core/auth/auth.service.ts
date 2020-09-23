import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { from, Observable } from "rxjs";
import { first, map } from 'rxjs/operators';

import { User } from 'src/app/shared/model/user.model';
import { UserEntityService } from '../store/entities/services/user-entity.service';



@Injectable()
export class AuthService {

    // constructor(private http:HttpClient) {
    constructor(
        private userService: UserEntityService,
    ) {
    }

    login(username: string, password: string): Observable<User> {
        // check users in cache and return if found match
        // return from([this.authenticate(username, password)]);
        return this.userService.entities$.pipe(
            map(users => users.find(u => u.username === username)),
            map(user => !!user && user.password === password ? user : undefined),
            first(),
        );
    }
}
