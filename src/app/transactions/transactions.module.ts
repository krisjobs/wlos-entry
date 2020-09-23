import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { RouterModule } from '@angular/router';
import { transactionsRoutes } from '../core/routing/routes';
import { MaterialTransactionsModule } from '../shared/material/material-transactions.module';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from 'src/app/core/store/entities/transactions.metadata'
import { TransactionEntityService } from '../core/store/entities/services/transaction-entity.service';
import { TransactionsResolver } from './services/transactions.resolver';
import { TransactionDataService } from '../core/store/entities/services/transaction-data.service';
import { CoreService } from '../core/core.service';


@NgModule({
  declarations: [
    HomeComponent, 
    TransactionComponent
  ],
  imports: [
    CommonModule,
    MaterialTransactionsModule,
    RouterModule.forChild(transactionsRoutes)
  ],
  providers: [
    TransactionEntityService,
    TransactionDataService,
    TransactionsResolver
  ]
})
export class TransactionsModule { 

  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private transactionDataService: TransactionDataService,
    private transactionEntityService: TransactionEntityService,
    private coreService: CoreService
    ) {

    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Transaction', transactionDataService)
    this.coreService.registerLoadingObservable(this.transactionEntityService.loading$)

  }

}
