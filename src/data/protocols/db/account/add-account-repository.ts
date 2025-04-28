import { Account, ICreateAccount } from '@domain/models/account/account';

export interface AddAccountRepository {
  create (accountData: ICreateAccount): Promise<Account>
}