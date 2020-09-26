import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { AppState } from 'src/app/core/store/reducers';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private coreService: CoreService,
  ) {
  }

  ngOnInit(): void {
  }



}
