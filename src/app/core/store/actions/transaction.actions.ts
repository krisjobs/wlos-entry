import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/model/user.model';
import { SortCriterion } from 'src/app/shared/shared.enums';

export const sortTable = createAction(
    '[TableToolbar] Sort Criteria Changed',
    props<{sortType: SortCriterion}>()
);
