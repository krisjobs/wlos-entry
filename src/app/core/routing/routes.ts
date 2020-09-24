import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/transactions/components/home/home.component';
import { TransactionComponent } from 'src/app/transactions/components/transaction/transaction.component';
import { BeneficiaryResolver } from 'src/app/transactions/services/beneficiary.resolver';
import { TransactionResolver } from 'src/app/transactions/services/transaction.resolver';
import { AuthGuard } from '../auth/auth.guard';


export const appRoutes: Routes = [
    {
        path: 'transactions',
        loadChildren: () => import('src/app/transactions/transactions.module').then(m => m.TransactionsModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: '/',
    }
];

export const transactionsRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            transactions: TransactionResolver,
            beneficiaries: BeneficiaryResolver,
        }
    },
    {
        path: ':transactionUrl',
        component: TransactionComponent,
        resolve: {
            transactions: TransactionResolver,
            beneficiaries: BeneficiaryResolver,
        }
    }
];