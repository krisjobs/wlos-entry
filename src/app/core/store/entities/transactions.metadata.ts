import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  Transaction: {},
  Subscription: {},
  Beneficiary: {},
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
