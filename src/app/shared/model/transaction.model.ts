import { TransactionType, TransactionState } from '../shared.enums';

export interface Transaction {
    id: string;    // uuid
    timestamp: number;    // milliseconds   
    beneficiaryId: string;    // uuid 
    amount: number;    // 12.34
    type: TransactionType;
    state: TransactionState;
}
