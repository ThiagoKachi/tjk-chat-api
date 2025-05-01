export type AccountStatus = 'online' | 'offline' | 'away';

export interface Account {
  id?: string;
  name: string;
  email: string;
  password: string;
  status: AccountStatus;
  lastSeen: Date;
  favoritesContacts: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ICreateAccount = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;
