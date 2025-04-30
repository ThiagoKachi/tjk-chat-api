import { DbLoadAccounts } from '@data/usecases/account/load-accounts';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { LoadAccountsController } from '@presentation/controllers/account/load-accounts-controller';
import { Controller } from '@presentation/protocols';

export const makeLoadAccountsController = (): Controller => {
  const accountRepository = new AccountMongoRepository();

  const loadAccounts = new DbLoadAccounts(accountRepository);

  return new LoadAccountsController(loadAccounts);
};
