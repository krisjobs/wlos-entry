import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { BeneficiaryEntityService } from 'src/app/core/store/entities/services/beneficiary-entity.service';

@Injectable()
export class BeneficiaryResolver implements Resolve<boolean> {

    constructor(
        private beneficiaryService: BeneficiaryEntityService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.beneficiaryService.loaded$.pipe(
            tap(loaded => {
                if (!loaded) {
                    this.beneficiaryService.getAll();
                }
            }),
            filter(loaded => !!loaded),
            first()
        )
    }
}