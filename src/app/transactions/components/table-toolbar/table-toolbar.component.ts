import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { select, Store } from '@ngrx/store';
import { debounceTime, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { TransactionActions } from 'src/app/core/store/actions';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { AppState } from 'src/app/core/store/reducers';
import { selectSortCriteria } from 'src/app/core/store/selectors/transaction.selectors';
import { Beneficiary } from 'src/app/shared/model';
import { SortCriterion } from 'src/app/shared/shared.enums';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements OnInit {

  SortCriterion = SortCriterion;
  
  public readonly sortButtons = [SortCriterion.Date, SortCriterion.Beneficiary, SortCriterion.Amount];

  public sortCriteria$ = this.store.pipe(
    select(selectSortCriteria),
  )

  public autocompleteOptions$ = this.beneficiaryService.entities$.pipe(
    // outer observable: list of beneficiaries
    switchMap(beneficiaries => this.searchField.valueChanges.pipe(
      // inner observable: input field
      startWith(''),
      debounceTime(200),
      // apply filter on transaction entities
      tap(searchValue => {
        const beneficiaryIds = this.filterFn(searchValue, beneficiaries)
          .map(beneficiary => beneficiary.id);
          
        this.transactionService.setFilter({
          beneficiaryIds
        })
      }),
      // filter beneficiaries for autocomplete 
      map(searchValue => this.filterFn(searchValue, beneficiaries)
        .map(beneficiary => beneficiary.contractorName)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        ),
    )),

  )

  private filterFn = (searchValue: string, beneficiaries: Beneficiary[]): Beneficiary[] => {
    const filterValue = searchValue.toLowerCase();

    return beneficiaries.filter(b => b.contractorName.toLowerCase().includes(filterValue));
  }

  public get searchField() { return this.formService.searchField; } 

  constructor(
    private store: Store<AppState>,
    private formService: FormService,
    private beneficiaryService: BeneficiaryEntityService,
    private transactionService: TransactionEntityService,
  ) { }

  ngOnInit(): void {
  }

  public onSortChange(sortType: SortCriterion) {
    this.store.dispatch(TransactionActions.sortTable({ sortType }))
  }

}
