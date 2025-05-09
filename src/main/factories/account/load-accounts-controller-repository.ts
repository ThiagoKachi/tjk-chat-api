import { DbLoadAccounts } from '@data/usecases/account/load-accounts';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { LoadAccountsValidatorAdapter } from '@infra/validation/account/load-accounts-validation';
import { LoadAccountsController } from '@presentation/controllers/account/load-accounts-controller';
import { Controller } from '@presentation/protocols';

export const makeLoadAccountsController = (): Controller => {
  const accountRepository = new AccountMongoRepository();

  const loadAccounts = new DbLoadAccounts(accountRepository);

  const validator = new LoadAccountsValidatorAdapter();

  return new LoadAccountsController(loadAccounts, validator);
};
