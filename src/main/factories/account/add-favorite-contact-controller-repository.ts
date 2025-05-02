import { DbAddFavoriteContact } from '@data/usecases/account/add-favorite-contact';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { AddFavoriteContactValidatorAdapter } from '@infra/validation/account/add-favorite-contact-validation';
import { AddFavoriteContactController } from '@presentation/controllers/account/add-favorite-contact-controller';
import { Controller } from '@presentation/protocols';

export const makeAddFavoriteContactController = (): Controller => {
  const accountRepository = new AccountMongoRepository();

  const loadAccounts = new DbAddFavoriteContact(accountRepository, accountRepository, accountRepository);
  const validator = new AddFavoriteContactValidatorAdapter();

  return new AddFavoriteContactController(loadAccounts, validator);
};
