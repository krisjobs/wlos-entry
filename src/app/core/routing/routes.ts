import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/transactions/components/home/home.component';
import { TransactionDetailsComponent } from 'src/app/transactions/components/transaction-details/transaction-details.component';
import { TransactionTableComponent } from 'src/app/transactions/components/transaction-table/transaction-table.component';
import { TransactionComponent } from 'src/app/transactions/components/transaction/transaction.component';
import { BeneficiaryResolver } from 'src/app/transactions/services/beneficiary.resolver';
import { TransactionResolver } from 'src/app/transactions/services/transaction.resolver';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../auth/login/login.component';

export const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }
];


export const appRoutes: Routes = [
    {
        path: 'transactions',
        loadChildren: () => import('src/app/transactions/transactions.module').then(m => m.TransactionsModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full'
    },
];

export const transactionsRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        resolve: {
            transactions: TransactionResolver,
            beneficiaries: BeneficiaryResolver,
        },
        children: [
            {
                path: '',
                // path: ':transactionId',
                component: TransactionTableComponent,
                outlet: 'transactions',
                pathMatch: 'full'
            },
            {
                path: ':transactionId',
                component: TransactionDetailsComponent,
                outlet: 'transactions',
                // pathMatch: 'full',
            },

        ],
    },
];