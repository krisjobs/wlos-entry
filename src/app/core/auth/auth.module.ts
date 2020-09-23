import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';

import { MaterialLoginModule } from 'src/app/shared/material/material-login.module';
import { authFeatureKey, authReducer } from '../store/reducers';
import { AuthGuard } from './auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/effects/auth.effects';
import { EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';
import { entityMetadata } from '../store/entities/auth.metadata';
import { User } from 'src/app/shared/model';
import { USERS } from 'src/assets/db-data';
import { UserDataService } from '../store/entities/services/user-data.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialLoginModule,

    RouterModule.forChild([{
      path: '',
      component: LoginComponent
    }]),
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    LoginComponent
  ]
})

export class AuthModule {

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    }
  }

  constructor(

  ) {

  }

}
