import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatGridListModule,
  ]
})
export class MaterialTransactionsModule { }
