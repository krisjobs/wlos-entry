import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Beneficiary } from 'src/app/shared/model';

@Injectable()
export class BeneficiaryEntityService extends EntityCollectionServiceBase<Beneficiary> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Beneficiary', serviceElementsFactory)

    }

}