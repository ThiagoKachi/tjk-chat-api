import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { LoadAccountsRepository } from '@data/protocols/db/account/load-accounts';
import { Account, ICreateAccount } from '@domain/models/account/account';
import { AccountModel } from '@infra/db/mongodb/schemas/account-schema';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountsRepository, LoadAccountByIdRepository {
  async loadById(id: string): Promise<Account> {
    const account = await AccountModel.findById(id);

    return account;
  }

  async load(): Promise<Account[]> {
    const accounts = await AccountModel.find();

    return accounts;
  }

  async loadByEmail(email: string): Promise<Account> {
    const account = await AccountModel.findOne({ email });

    return account;
  }

  async create(accountData: ICreateAccount): Promise<Account> {
    const newAccount = new AccountModel(accountData);

    const savedAccount = await newAccount.save();

    return savedAccount;
  }
}