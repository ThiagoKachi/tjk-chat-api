import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { Account } from '@domain/models/account/account';
import { LoadAccountById } from '@domain/usecases/account/load-account-by-id';

export class DbLoadAccountById implements LoadAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
  ) {}

  async loadById(id: string): Promise<Account> {
    const account = await this.loadAccountByIdRepository.loadById(id);

    return account;
  }
}