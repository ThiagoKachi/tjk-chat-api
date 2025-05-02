import { AddAccountRepository } from '@data/protocols/db/account/add-account-repository';
import { ChangeStatusRepository } from '@data/protocols/db/account/change-status';
import { LoadAccountByEmailRepository } from '@data/protocols/db/account/load-account-by-email';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { LoadAccountsRepository } from '@data/protocols/db/account/load-accounts';
import { Account, ICreateAccount } from '@domain/models/account/account';
import { UserStatus } from '@domain/models/user-status';
import { AddFavoriteContact } from '@domain/usecases/account/add-favorite-contact';
import { AccountModel } from '@infra/db/mongodb/schemas/account-schema';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, LoadAccountsRepository, LoadAccountByIdRepository, ChangeStatusRepository, AddFavoriteContact {
  async addFavorite(userId: string, contactId: string): Promise<void> {
    await AccountModel
      .updateOne({ _id: userId }, { $push: { favoritesContacts: contactId } });
  }

  async change(accountId: string, status: UserStatus): Promise<void> {
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
