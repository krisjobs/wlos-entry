import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Beneficiary } from 'src/app/shared/model';

@Injectable()
export class BeneficiaryEntityService extends EntityCollectionServiceBase<Beneficiary> {

    public filterFn = (searchValue: string, beneficiaries: Beneficiary[]): Beneficiary[] => {
        if(!searchValue || !searchValue.length) {
            return beneficiaries;
        }
        const filterValue = searchValue.toLowerCase();
    
        return beneficiaries.filter(b => b.contractorName.toLowerCase().includes(filterValue));
      }

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Beneficiary', serviceElementsFactory)

    }
}