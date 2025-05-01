import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { ChangeStatusRepository } from '@data/protocols/db/account/change-status';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { LoadAccountsRepository } from '@data/protocols/db/account/load-accounts';
import { Account, AccountStatus, ICreateAccount } from '@domain/models/account/account';
import { AccountModel } from '@infra/db/mongodb/schemas/account-schema';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountsRepository, LoadAccountByIdRepository, ChangeStatusRepository {
  async change(accountId: string, status: AccountStatus): Promise<void> {
    await AccountModel.updateOne({ _id: accountId }, { $set: { status } });
  }

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
