import { DbAddAccount } from '@data/usecases/account/auth/add-account';
import { BcryptAdapter } from '@infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { CreateAccountValidatorAdapter } from '@infra/validation/account/auth/create-account-validation';
import { CreateAccountController } from '@presentation/controllers/account/auth/create-account-controller';
import { Controller } from '@presentation/protocols';

export const makeCreateAccountController = (): Controller => {
  const accountRepository = new AccountMongoRepository();
  const hasher = new BcryptAdapter(12);

  const createAccount = new DbAddAccount(
    accountRepository,
    accountRepository,
    hasher,
  );

  const validator = new CreateAccountValidatorAdapter();

  return new CreateAccountController(createAccount, validator);
};
