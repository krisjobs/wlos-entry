import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

import { User } from 'src/app/shared/model/user.model';



@Injectable()
export class AuthService {

    // constructor(private http:HttpClient) {
    constructor() {

    }

    login(username: string, password: string): Observable<User> {
        // check users in cache and return if found match
        return from([this.authenticate(username, password)]);
    }

    authenticate(username: string, password: string): User {
        // const user: any = Object.values(USERS).find(user => user.email === email);

        // if (user && user.password == password) {
        //     return user;
        // } else {
        //     return undefined;
        // }
        return ({ id: null, username, password })
    }
}
