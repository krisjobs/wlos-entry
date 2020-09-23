import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export const entityMetadata: EntityMetadataMap = {
  User: {}
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
