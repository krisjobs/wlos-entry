import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { Beneficiary, Transaction } from 'src/app/shared/model';

const pluralNames = {
  Beneficiary: 'Beneficiaries'
};

const filterFn = (entities: Transaction[], pattern: { beneficiaryIds: string[] }) => {
  if (!pattern.beneficiaryIds) {
    return entities;
  }
  
  const filteredEntities = entities.filter(transaction => pattern.beneficiaryIds.indexOf(transaction.beneficiaryId) >= 0);
  
  return filteredEntities;
};

export const entityMetadata: EntityMetadataMap = {
  Transaction: {
    filterFn
  },
  Beneficiary: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
