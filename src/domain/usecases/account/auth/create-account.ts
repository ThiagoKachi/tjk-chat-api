import { Account } from '@domain/models/account/account';

export interface CreateAccount {
  create (accountData: Account): Promise<Account>
}