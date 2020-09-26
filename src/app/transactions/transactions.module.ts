import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { RouterModule } from '@angular/router';
import { transactionsRoutes } from '../core/routing/routes';
import { MaterialTransactionsModule } from '../shared/material/material-transactions.module';
import { EntityDataModule, EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityConfig, entityMetadata } from 'src/app/core/store/entities/transactions.metadata'
import { TransactionEntityService } from '../core/store/entities/services/transaction-entity.service';
import { TransactionResolver } from './services/transaction.resolver';
import { TransactionDataService } from '../core/store/entities/services/transaction-data.service';
import { BeneficiaryDataService } from '../core/store/entities/services/beneficiary-data.service';
import { BeneficiaryEntityService } from '../core/store/entities/services/beneficiary-entity.service';
import { BeneficiaryResolver } from './services/beneficiary.resolver';
import { TransferComponent } from './components/transfer/transfer.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';
import { TileHeaderComponent } from './components/tile-header/tile-header.component';
import { TableToolbarComponent } from './components/table-toolbar/table-toolbar.component';
import { DateConverterPipe } from './pipes/date-converter.pipe';
import { AmountConverterPipe } from './pipes/amount-converter.pipe';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { LogoPathPipe } from './pipes/logo-path.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './services/form.service';
import { EffectsModule, USER_PROVIDED_EFFECTS } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { transactionFeatureKey, transactionReducer } from 'src/app/core/store/reducers';


@NgModule({
  declarations: [
    HomeComponent,
    TransactionComponent,
    TransferComponent,
    TransactionTableComponent,
    TileHeaderComponent,
    TableToolbarComponent,
    DateConverterPipe,
    AmountConverterPipe,
    TransactionDetailsComponent,
    LogoPathPipe
  ],
  imports: [
    CommonModule,
    MaterialTransactionsModule,
    ReactiveFormsModule,
    RouterModule.forChild(transactionsRoutes),
    StoreModule.forFeature(transactionFeatureKey, transactionReducer),
    EffectsModule.forFeature([]),
  ],
  providers: [
    BeneficiaryEntityService,
    TransactionEntityService,
    BeneficiaryDataService,
    TransactionDataService,
    TransactionResolver,
    BeneficiaryResolver,
    FormService
  ]
})
export class TransactionsModule {

  constructor(
    entityDefinitionService: EntityDefinitionService,
    entityDataService: EntityDataService,
    transactionDataService: TransactionDataService,
    beneficiaryDataService: BeneficiaryDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Transaction', transactionDataService);
    entityDataService.registerService('Beneficiary', beneficiaryDataService);
  }

}
