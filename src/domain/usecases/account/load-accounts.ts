import { Account } from '@domain/models/account/account';

export interface LoadAccounts {
  load (): Promise<Account[]>
}