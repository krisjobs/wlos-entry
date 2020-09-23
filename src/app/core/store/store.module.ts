import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers, routerFeatureKey } from './reducers';
import { EntityDataModule, EntityDataService, EntityDefinitionService, EntityServices } from '@ngrx/data';
import { entityConfig, entityMetadata } from './entities/auth.metadata';
import { CoreService } from '../core.service';
import { UserDataService } from './entities/services/user-data.service';
import { User } from 'src/app/shared/model';
import { USERS } from 'src/assets/db-data';
import { UserEntityService } from './entities/services/user-entity.service';


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
    EffectsModule.forRoot([CoreService]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: routerFeatureKey,
      routerState: RouterState.Minimal
    }),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    UserDataService,
    UserEntityService,
  ]
})
export class StoreModule {

  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityServices: EntityServices,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('User', userDataService)
    this.entityServices.getEntityCollectionService<User>('User').addAllToCache(USERS);
  }
}
