import { Component, OnInit } from '@angular/core';
import { debounceTime, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';
import { TransactionEntityService } from 'src/app/core/store/entities/services/transaction-entity.service';
import { Beneficiary } from 'src/app/shared/model';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements OnInit {

  public autocompleteOptions$ = this.beneficiaryService.entities$.pipe(
    switchMap(beneficiaries => this.searchField.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(searchValue => {
        const beneficiaryIds = this.filterFn(searchValue, beneficiaries)
          .map(beneficiary => beneficiary.id);
          
        this.transactionService.setFilter({
          beneficiaryIds
        })
      }),
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
    private formService: FormService,
    private beneficiaryService: BeneficiaryEntityService,
    private transactionService: TransactionEntityService,
  ) { }

  ngOnInit(): void {
  }

}
