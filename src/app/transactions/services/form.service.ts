import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createEffect } from '@ngrx/effects';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { Transaction } from 'src/app/shared/model';

@Injectable()
export class FormService {

  public searchField = new FormControl(''); 

  constructor(
  ) { }
}
