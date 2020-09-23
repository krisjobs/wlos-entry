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
import { EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from '../store/entities/auth.metadata';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialLoginModule,

    RouterModule.forChild([{path: '', component: LoginComponent}]),
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

  constructor(private eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata)
  }

}
