import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { createEffect } from '@ngrx/effects';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { Transaction } from 'src/app/shared/model';

@Injectable()
export class FormService {

  public searchField = this.fb.control('');

  public transferGroup = this.fb.group({
    fromAccount: ['', [Validators.required]],
    toAccount: ['', [Validators.required]],
    amount: ['', [Validators.required]],
  });

  public transactionState = this.fb.control('');

  constructor(
    private fb: FormBuilder
  ) { }
}
