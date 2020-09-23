import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from './store/store.module';
import { RoutingModule } from './routing/routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule.forRoot(),
  ],
  exports: [
    StoreModule,
    RoutingModule,
    HttpClientModule,
  ]
})
export class CoreModule { }
