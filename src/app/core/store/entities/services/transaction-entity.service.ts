import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Transaction } from 'src/app/shared/model';

@Injectable()
export class TransactionEntityService extends EntityCollectionServiceBase<Transaction> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Transaction', serviceElementsFactory)

    }

}