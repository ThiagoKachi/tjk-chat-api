import { DbRemoveFavoriteContact } from '@data/usecases/account/remove-favorite-contact';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { RemoveFavoriteContactValidatorAdapter } from '@infra/validation/account/remove-favorite-contact-validation';
import { RemoveFavoriteContactController } from '@presentation/controllers/account/remove-favorite-contact-controller';
import { Controller } from '@presentation/protocols';

export const makeRemoveFavoriteContactController = (): Controller => {
  const accountRepository = new AccountMongoRepository();

  const loadAccounts = new DbRemoveFavoriteContact(accountRepository, accountRepository);
  const validator = new RemoveFavoriteContactValidatorAdapter();

  return new RemoveFavoriteContactController(loadAccounts, validator);
};
