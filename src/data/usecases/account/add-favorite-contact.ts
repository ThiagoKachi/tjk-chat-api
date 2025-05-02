import { AddFavoriteContactRepository } from '@data/protocols/db/account/add-favorite-contact';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { LoadFavoriteContactsRepository } from '@data/protocols/db/account/load-favorite-contacts';
import { AddFavoriteContact } from '@domain/usecases/account/add-favorite-contact';
import { ConflictError } from '@presentation/errors/conflict-error';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbAddFavoriteContact implements AddFavoriteContact {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly addFavoriteContactRepository: AddFavoriteContactRepository,
    private readonly loadFavoriteContactsRepository: LoadFavoriteContactsRepository,
  ) {}

  async addFavorite(accountId: string, contactId: string): Promise<void> {
    const user = await this.loadAccountByIdRepository.loadById(contactId);

    if (!user) {
      throw new NotFoundError('Account not found');
    }

    const favoriteContacts = await this.loadFavoriteContactsRepository.loadFavorites(accountId);

    const isFavorite = favoriteContacts.find((contact) => contact.id === contactId);

    if (isFavorite) {
      throw new ConflictError('Contact already added as favorite');
    }

    await this.addFavoriteContactRepository.addFavorite(accountId, contactId);
  }
}
