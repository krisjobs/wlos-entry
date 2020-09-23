import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from 'src/app/core/store/reducers';
import { AuthActions } from '../../store/actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    const formContent = this.form.value;

    this.auth.login(formContent.username, formContent.password)
      .pipe(
        tap(user => {
          if (!!user) {
            this.store.dispatch(AuthActions.login({ user }));

            this.router.navigateByUrl('/transactions');
          } else {
            throw Error('Unknown user!');
          }

        })
      )
      .subscribe(
        noop,
        error => alert(`Login failed with error: "${error}"`)
      );
  }

}

