import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/transactions/components/home/home.component';
import { TransactionDetailsComponent } from 'src/app/transactions/components/transaction-details/transaction-details.component';
import { TransactionTableComponent } from 'src/app/transactions/components/transaction-table/transaction-table.component';
import { TransactionComponent } from 'src/app/transactions/components/transaction/transaction.component';
import { BeneficiaryResolver } from 'src/app/transactions/services/beneficiary.resolver';
import { TransactionResolver } from 'src/app/transactions/services/transaction.resolver';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../auth/login/login.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
    }
];


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/transactions',
        pathMatch: 'full'
    },
    {
        path: 'transactions',
        loadChildren: () => import('src/app/transactions/transactions.module').then(m => m.TransactionsModule),
        canActivate: [AuthGuard],
        data: {
            preload: false
        }
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];


export const transactionsRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            transactions: TransactionResolver,
            beneficiaries: BeneficiaryResolver,
        },
        children: [
            {
                path: '',
                component: TransactionTableComponent,
            },
            {
                path: ':transactionId',
                component: TransactionDetailsComponent,
            },

        ],
    },
];