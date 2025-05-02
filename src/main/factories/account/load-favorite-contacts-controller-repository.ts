import { DbLoadFavoriteContacts } from '@data/usecases/account/load-favorite-contacts';
import { AccountMongoRepository } from '@infra/db/mongodb/repositories/account-mongo-repository';
import { LoadFavoriteContactsController } from '@presentation/controllers/account/load-favorite-contacts-controller';
import { Controller } from '@presentation/protocols';

export const makeLoadFavoriteContactsController = (): Controller => {
  const accountRepository = new AccountMongoRepository();

  const favoriteAccounts = new DbLoadFavoriteContacts(accountRepository);

  return new LoadFavoriteContactsController(favoriteAccounts);
};
