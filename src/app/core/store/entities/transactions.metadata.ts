import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Transaction: {},
  Beneficiary: {},
};

const pluralNames = {
  Beneficiary: 'Beneficiaries'
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
