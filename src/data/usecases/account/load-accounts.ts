import { LoadAccountsRepository } from '@data/protocols/db/account/load-accounts';
import { Account } from '@domain/models/account/account';
import { LoadAccounts } from '@domain/usecases/account/load-accounts';

export class DbLoadAccounts implements LoadAccounts {
  constructor (
    private readonly loadAccountsRepository: LoadAccountsRepository,
  ) {}

  async load(): Promise<Account[]> {
    const accounts = await this.loadAccountsRepository.load();

    return accounts;
  }
}