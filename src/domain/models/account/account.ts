export interface Account {
  id?: string;
  name: string;
  email: string;
  password: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
  favoritesContacts: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ICreateAccount = Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;
