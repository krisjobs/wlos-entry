import { Beneficiary, Transaction, User } from 'src/app/shared/model';
import { TransactionState, TransactionType } from 'src/app/shared/shared.enums';
import { v4 as uuid } from 'uuid';
import { randomDate, randomEnum } from './utils';

export const USERS: User[] = [
  {
    id: uuid(),
    username: 'username',
    password: 'password'
  },
  {
    id: uuid(),
    username: 'admin',
    password: 'sudo'
  }
];

export const BENEFICIARIES: Beneficiary[] = [
  {
    id: uuid(),
    contractorName: 'The Tea Lounge',
    logoPath: 'the-tea-lounge.png',
  },
  {
    id: uuid(),
    contractorName: 'Texaco',
    logoPath: 'texaco.png',
  },
  {
    id: uuid(),
    contractorName: 'Amazon Online Store',
    logoPath: 'amazon-online-store.png',
  },
  {
    id: uuid(),
    contractorName: '7-Eleven',
    logoPath: '7-eleven.png',
  },
  {
    id: uuid(),
    contractorName: 'H&M Online Store',
    logoPath: 'hm-online-store.png',
  },
  {
    id: uuid(),
    contractorName: 'Jerry Hildreth',
    logoPath: 'jerry-hildreth.png',
  },
  {
    id: uuid(),
    contractorName: 'Lawrence Pearson',
    logoPath: 'lawrence-pearson.png',
  },
  {
    id: uuid(),
    contractorName: 'Whole Foods',
    logoPath: 'whole-foods.png',
  },
  {
    id: uuid(),
    contractorName: 'Southern Electric Company',
    logoPath: 'southern-electric-company.png',
  }
];

const numTransactions = 42;
const maxAmount = 420;
const startDate = new Date(2020, 4, 20);
const endDate = new Date();
const numBeneficiaries = BENEFICIARIES.length;

export const TRANSACTIONS: Transaction[] = [...Array(numTransactions)].map(
  _ => ({
    id: uuid(),
    amount: Number((Math.random() * maxAmount).toFixed(2)),
    state: randomEnum(TransactionState),
    type: randomEnum(TransactionType),
    timestamp: randomDate(startDate, endDate).getTime(),
    beneficiaryId: BENEFICIARIES[Math.floor(Math.random() * numBeneficiaries)].id,
  })
);
