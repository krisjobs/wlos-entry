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


@NgModule({
  declarations: [
    HomeComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    MaterialTransactionsModule,
    RouterModule.forChild(transactionsRoutes),
  ],
  providers: [
    BeneficiaryEntityService,
    TransactionEntityService,
    BeneficiaryDataService,
    TransactionDataService,
    TransactionResolver,
    BeneficiaryResolver,
  ]
})
export class TransactionsModule {

  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private transactionDataService: TransactionDataService,
    private beneficiaryDataService: BeneficiaryDataService,
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Transaction', transactionDataService)
    entityDataService.registerService('Beneficiary', beneficiaryDataService)
  }

}
