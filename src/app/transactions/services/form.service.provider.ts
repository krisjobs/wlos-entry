import { EntityDefinitionService, EntityDataService, Logger, EntityServices } from '@ngrx/data';
import { entityMetadata } from 'src/app/core/store/entities/auth.metadata';
import { BeneficiaryDataService } from 'src/app/core/store/entities/services/beneficiary-data.service';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionDataService } from 'src/app/core/store/entities/services/transaction-data.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { FormService } from './form.service';

// const formServiceFactory = (
//         entityDefinitionService: EntityDefinitionService,
//         entityDataService: EntityDataService,
//         transactionDataService: TransactionDataService,
//         beneficiaryDataService: BeneficiaryDataService,
//         entityServices: EntityServices,
//     ) => {

//     entityDefinitionService.registerMetadataMap(entityMetadata);
//     entityDataService.registerService('Transaction', transactionDataService);
//     entityDataService.registerService('Beneficiary', beneficiaryDataService);
//     const transactionsService = entityServices.getEntityCollectionService('Transaction') as TransactionEntityService;
//     const beneficiaryService = entityServices.getEntityCollectionService('Beneficiary') as BeneficiaryEntityService;
//     return new FormService(transactionsService, beneficiaryService);
// };

// export const formServiceProvider = {
//     provide: FormService,
//     useFactory: formServiceFactory,
//     deps: [
//         EntityDefinitionService,
//         EntityDataService,
//         TransactionDataService,
//         BeneficiaryDataService,
//         EntityServices,
//     ]
// };

// formServiceProvider,
// {
//   provide: USER_PROVIDED_EFFECTS,
//   multi: true,
//   useValue: [FormService],
//   deps: [
//     formServiceProvider
//   ]
// },