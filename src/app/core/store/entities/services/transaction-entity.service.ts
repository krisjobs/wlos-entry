import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Transaction } from 'src/app/shared/model';
import { ExtendedTransaction, TransactionDetails } from 'src/app/shared/model/transaction.model';
import { TransactionType } from 'src/app/shared/shared.enums';
import { BeneficiaryEntityService } from './beneficiary-entity.service';

@Injectable()
export class TransactionEntityService extends EntityCollectionServiceBase<Transaction> {

    public transactionDetails$ = (transactionId): Observable<TransactionDetails> => this.entityMap$.pipe(
        map(transactions => transactions[transactionId]),
        switchMap(transaction => this.beneficiaryService.entityMap$.pipe(
            map(beneficiaries => ({
                id: transactionId,
                amount: transaction.amount,
                timestamp: transaction.timestamp,
                contractorName: beneficiaries[transaction.beneficiaryId].contractorName,
                state: transaction.state,
            }))
        ))
    );

    public extendedFilteredTransactions$ = this.filteredEntities$.pipe(
        switchMap(transactions => this.beneficiaryService.entityMap$.pipe(
            map(beneficiaries => transactions
                .map((transaction): ExtendedTransaction => ({
                    id: transaction.id,
                    timestamp: transaction.timestamp,
                    type: TransactionType[transaction.type],
                    contractorName: beneficiaries[transaction.beneficiaryId].contractorName,
                    logoPath: beneficiaries[transaction.beneficiaryId].logoPath,
                    amount: transaction.amount,
                    state: transaction.state,
                }))
            )
        ))
    );

    constructor(
        serviceElementsFactory: EntityCollectionServiceElementsFactory,
        private beneficiaryService: BeneficiaryEntityService,
    ) {
        super('Transaction', serviceElementsFactory)

    }

}