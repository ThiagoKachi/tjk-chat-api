import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email';
import { Account, ICreateAccount } from '@domain/models/account/account';
import { AccountModel } from '@infra/db/mongodb/schemas/account-schema';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
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