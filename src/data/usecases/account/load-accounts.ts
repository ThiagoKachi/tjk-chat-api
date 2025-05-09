import { LoadAccountsRepository } from '@data/protocols/db/account/load-accounts';
import { Account } from '@domain/models/account/account';
import { ILoadAccounts, LoadAccounts } from '@domain/usecases/account/load-accounts';

export class DbLoadAccounts implements LoadAccounts {
  constructor (
    private readonly loadAccountsRepository: LoadAccountsRepository,
  ) {}

  async load({ conversationId, inGroup }: ILoadAccounts): Promise<Account[]> {
    const accounts = await this.loadAccountsRepository.load({ conversationId, inGroup });

    return accounts;
  }
}
