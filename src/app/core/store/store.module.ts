import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers, routerFeatureKey } from './reducers';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entities/auth.metadata';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgrxStoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: routerFeatureKey,
      routerState: RouterState.Minimal
    }),
    EntityDataModule.forRoot(entityConfig),
  ]
})
export class StoreModule { }
