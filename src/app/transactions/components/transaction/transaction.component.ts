import { Component, Input, OnInit } from '@angular/core';
import { ExtendedTransaction } from 'src/app/shared/model/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @Input() transaction: ExtendedTransaction;

  constructor() { }

  ngOnInit(): void {
  }

}
