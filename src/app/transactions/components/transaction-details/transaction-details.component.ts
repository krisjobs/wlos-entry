import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { TransactionState } from 'src/app/shared/shared.enums';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

  public title = `Details for transaction `;

  public details$ = this.route.params.pipe(
    switchMap(({ transactionId }) =>
      this.transactionService.transactionDetails$(transactionId).pipe(
        tap(details => this.formService.transactionState.patchValue(details.state)),
        map(details => [
          'Amount',
          `-$${details.amount}`,
          'Date',
          (new Date(details.timestamp)).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          'To Contractor',
          details.contractorName,
          'State',
          TransactionState[details.state]
        ])
      )
    )
  );

  public tooltip$ = this.route.params.pipe(
    map(({ transactionId }) => transactionId)
  );

  TransactionState = TransactionState;
  public transactionStates = [
    TransactionState.Paid,
    TransactionState.Confirmed,
    TransactionState.Received,
  ]

  public get transactionState() { return this.formService.transactionState }

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionEntityService,
    private formService: FormService
  ) {
  }

  ngOnInit(): void {
  }

  public colorButton = (state: string): string => {
    switch (TransactionState[state]) {
      case TransactionState.Paid:
        return '#c42124';
      case TransactionState.Confirmed:
        return '#c69417';
      case TransactionState.Received:
        return '#11a283';
    }
  }

  public stateChanged(newState: TransactionState) {
    this.transactionService.updateOneInCache({
      id: this.route.snapshot.params['transactionId'],
      state: newState
    })
  }
}
