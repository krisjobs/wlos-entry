import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { ExtendedTransaction } from 'src/app/shared/model/transaction.model';
import { TransactionType } from 'src/app/shared/shared.enums';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {

  
  public transactions$ = this.transactionsService.entities$.pipe(
    switchMap(transactions => this.beneficiaryService.entityMap$.pipe(
      map(beneficiaries => transactions.map((transaction): ExtendedTransaction => ({
        timestamp: transaction.timestamp,
        type: TransactionType[transaction.type],
        contractorName: beneficiaries[transaction.beneficiaryId].contractorName,
        logoPath: beneficiaries[transaction.beneficiaryId].logoPath,
        amount: transaction.amount
      })))
    ))
  );

  public displayedColumns = ['date', 'details', 'amount'];

  
  constructor(
    private transactionsService: TransactionEntityService,
    private beneficiaryService: BeneficiaryEntityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
