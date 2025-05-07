import { UserStatus } from './user-status';


export interface Account {
  id?: string;
  name: string;
  email: string;
  password: string;
  status: UserStatus;
  lastSeen: Date;
  favoritesContacts: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ICreateAccount = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;
