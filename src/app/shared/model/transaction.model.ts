import { TransactionType, TransactionState } from '../shared.enums';

export interface Transaction {
    id: string;    // uuid
    timestamp: number;    // milliseconds   
    beneficiaryId: string;    // uuid 
    amount: number;    // 12.34
    type: TransactionType;
    state: TransactionState;
}

export interface ExtendedTransaction {
    id: string;    // needed for router
    timestamp: number;
    type: string;    // TransactionType -> string
    contractorName: string;    // from beneficiary
    logoPath: string;    // from beneficiary
    amount: number;
    state: TransactionState;
}