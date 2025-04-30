import { Account } from '@domain/models/account/account';

export interface LoadAccountById {
  loadById (id: string): Promise<Account>
}