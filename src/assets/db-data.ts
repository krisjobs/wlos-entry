import { Transaction, User } from 'src/app/shared/model';
import { v4 as uuid } from 'uuid';

export const USERS: User[] = [
  {
    id: uuid(),
    username: 'username',
    password: 'password'
  }
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: uuid(),
    position: 1, 
    name: 'Hydrogen', 
    weight: 1.0079, 
    symbol: 'H',
  },
  {
    id: uuid(),
    position: 2, 
    name: 'Helium', 
    weight: 4.0026, 
    symbol: 'He',
  },
  {
    id: uuid(),
    position: 3, 
    name: 'Lithium', 
    weight: 6.941, 
    symbol: 'Li',
  },
  {
    id: uuid(),
    position: 4, 
    name: 'Beryllium', 
    weight: 9.0122, 
    symbol: 'Be',
  },
  {
    id: uuid(),
    position: 5, 
    name: 'Boron', 
    weight: 10.811, 
    symbol: 'B',
  },
  {
    id: uuid(),
    position: 6, 
    name: 'Carbon', 
    weight: 12.0107, 
    symbol: 'C',
  },
  {
    id: uuid(),
    position: 7, 
    name: 'Nitrogen', 
    weight: 14.0067, 
    symbol: 'N',
  },
  {
    id: uuid(),
    position: 8, 
    name: 'Oxygen', 
    weight: 15.9994, 
    symbol: 'O',
  },
  {
    id: uuid(),
    position: 9, 
    name: 'Fluorine', 
    weight: 18.9984, 
    symbol: 'F',
  },
  {
    id: uuid(),
    position: 10, 
    name: 'Neon', 
    weight: 20.1797, 
    symbol: 'Ne',
  },
];
