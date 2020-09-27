import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { switchMap, startWith, debounceTime, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { Beneficiary, Transaction } from 'src/app/shared/model';
import { TransferForm } from 'src/app/shared/shared.models';
import { FormService } from '../../services/form.service';
import { v4 as uuid } from 'uuid';
import { TransactionState, TransactionType } from 'src/app/shared/shared.enums';
import { BENEFICIARIES } from 'src/assets/db-data';
import { randomEnum, randomDate } from 'src/assets/utils';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  private accountBalanceGenerator = (min: number, max: number) => {
    return Number(Number(Math.random() * (max - min + 1) + min).toFixed(2));
  };

  private get accountBalance() {
    const fromLocalStorage = localStorage.getItem('balance');
    const balance = !!fromLocalStorage ? Number(fromLocalStorage) : this.accountBalanceGenerator(24000, 42000);
    localStorage.setItem('balance', balance.toString());
    return balance;
  }

  private $accountBalance = new BehaviorSubject(this.accountBalance);
  private updateBalance(transferAmount: number) {
    const newBalance = this.$accountBalance.value - transferAmount;
    this.$accountBalance.next(newBalance);
    localStorage.setItem('balance', newBalance.toString());
  }

  public fromAccounts$ = this.$accountBalance.pipe(
    map(balance => [`Free Checking (4200) - $${balance.toFixed(2)}`])
  )

  public autocompleteOptions$ = this.beneficiaryService.entities$.pipe(
    // outer observable: list of beneficiaries
    switchMap(beneficiaries => this.transferGroup.valueChanges.pipe(
      // inner observable: input field
      startWith(''),
      debounceTime(200),
      // filter beneficiaries for autocomplete 
      map(({toAccount}: TransferForm) => this.beneficiaryService.filterFn(toAccount, beneficiaries)
        .map(beneficiary => beneficiary.contractorName)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        ),
    )),
  );

  public get transferGroup() { return this.formService.transferGroup; } 

  constructor(
    private formService: FormService,
    private beneficiaryService: BeneficiaryEntityService,
    private transactionService: TransactionEntityService,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit(amount: string, toAccount: string, formDirective: FormGroupDirective) {
      this.updateBalance(Number(amount));
      formDirective.resetForm();
      this.transferGroup.reset();
      
      const bIdx = BENEFICIARIES.findIndex(b => b.contractorName === toAccount)
      let beneficiaryId: string;
      if (bIdx > -1) {
        beneficiaryId = BENEFICIARIES[bIdx].id;
      } else {
        beneficiaryId = uuid();
        const newBeneficiary = {
          id: beneficiaryId,
          contractorName: toAccount,
          logoPath: 'unknown.png'
        } as Beneficiary;
        this.beneficiaryService.addOneToCache(newBeneficiary);
      }

      const newTransaction = {
        id: uuid(),
        amount: Number(amount),
        state: TransactionState.Paid,
        type: TransactionType["Online Transfer"],
        timestamp: Date.now(),
        beneficiaryId: beneficiaryId, 
      } as Transaction;
      this.transactionService.addOneToCache(newTransaction);
  }

}
