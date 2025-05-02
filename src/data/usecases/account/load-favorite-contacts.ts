import { LoadFavoriteContactsRepository } from '@data/protocols/db/account/load-favorite-contacts';
import { Account } from '@domain/models/account/account';
import { LoadFavoriteContacts } from '@domain/usecases/account/load-favorite-contacts';

export class DbLoadFavoriteContacts implements LoadFavoriteContacts {
  constructor (
    private readonly loadFavoriteContactsRepository: LoadFavoriteContactsRepository,
  ) {}

  async loadFavorites(accountId: string): Promise<Account[]> {
    return await this.loadFavoriteContactsRepository.loadFavorites(accountId);
  }
}
