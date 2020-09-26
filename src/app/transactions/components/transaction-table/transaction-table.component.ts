import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { AppState } from 'src/app/core/store/reducers';
import { selectSortCriteria } from 'src/app/core/store/selectors/transaction.selectors';
import { ExtendedTransaction } from 'src/app/shared/model/transaction.model';
import { SortCriterion, TransactionType } from 'src/app/shared/shared.enums';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  @ViewChild(MatTable, { static: false }) table: MatTable<ExtendedTransaction>;
  
  public transactions$ = this.transactionsService.filteredEntities$.pipe(
    switchMap(transactions => this.beneficiaryService.entityMap$.pipe(
      map(beneficiaries => transactions
        .map((transaction): ExtendedTransaction => ({
          timestamp: transaction.timestamp,
          type: TransactionType[transaction.type],
          contractorName: beneficiaries[transaction.beneficiaryId].contractorName,
          logoPath: beneficiaries[transaction.beneficiaryId].logoPath,
          amount: transaction.amount}))
      )
    )),
    switchMap(transactions => this.store.pipe(
      select(selectSortCriteria),
      map(({ sortType, sortDescending }) => {
        switch(sortType) {
          case SortCriterion.Date:
            transactions.sort((t1, t2) => this.dateComparer(t1, t2, sortDescending));
            this.table && this.table.renderRows();
            return transactions;
          case SortCriterion.Beneficiary:
            transactions.sort((t1, t2) => this.beneficiaryComparer(t1, t2, sortDescending));
            this.table && this.table.renderRows();
            return transactions;
          case SortCriterion.Amount:
            transactions.sort((t1, t2) => this.amountComparer(t1, t2, sortDescending));
            this.table && this.table.renderRows();
            return transactions;
          default:
            break;
        }
      })
    )),
  );

  public displayedColumns = ['date', 'details', 'amount'];

  private dateComparer = (t1: ExtendedTransaction, t2: ExtendedTransaction, sortDescending: boolean) => {
    return sortDescending ? t2.timestamp - t1.timestamp : t1.timestamp - t2.timestamp;
  }

  private stringComparer = (s1: string, s2: string) => {
    if (s1 < s2) {
      return -1;
    } else if (s1 > s2) {
      return 1;
    } else {
      return 0;
    }
  }

  private beneficiaryComparer = (t1: ExtendedTransaction, t2: ExtendedTransaction, sortDescending: boolean) => {
    return (sortDescending ? -1 : 1) * this.stringComparer(t1.contractorName, t2.contractorName);
  }

  private amountComparer = (t1: ExtendedTransaction, t2: ExtendedTransaction, sortDescending: boolean) => {
    return sortDescending ? t2.amount - t1.amount : t1.amount - t2.amount;
  }
  
  constructor(
    private store: Store<AppState>,
    private transactionsService: TransactionEntityService,
    private beneficiaryService: BeneficiaryEntityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
}
