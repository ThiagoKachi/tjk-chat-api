import { Hasher } from '@data/protocols/criptography/hasher';
import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email';
import { Account, ICreateAccount } from '@domain/models/account/account';
import { CreateAccount } from '@domain/usecases/account/create-account';
import { ConflictError } from '@presentation/errors/conflict-error';

export class DbAddAccount implements CreateAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
  ) {}

  async create(accountData: ICreateAccount): Promise<Account> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email);

    if (account) {
      throw new ConflictError('Account already exists');
    }

    const hashedPassword = await this.hasher.hash(accountData.password);

    const newAccount = await this.addAccountRepository.create({
      ...accountData,
      password: hashedPassword,
    });

    return newAccount;
  }
}