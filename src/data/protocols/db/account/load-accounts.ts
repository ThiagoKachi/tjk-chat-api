import { Account } from '@domain/models/account/account';

export interface LoadAccountsRepository {
  load (): Promise<Account[]>;
}
