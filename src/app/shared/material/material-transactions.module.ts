import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatInputModule,
  ]
})
export class MaterialTransactionsModule { }
