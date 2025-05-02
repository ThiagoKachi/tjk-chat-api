import { AddFavoriteContactRepository } from '@data/protocols/db/account/add-favorite-contact';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { AddFavoriteContact } from '@domain/usecases/account/add-favorite-contact';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbAddFavoriteContact implements AddFavoriteContact {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly addFavoriteContactRepository: AddFavoriteContactRepository,
  ) {}

  async addFavorite(accountId: string, contactId: string): Promise<void> {
    const user = await this.loadAccountByIdRepository.loadById(contactId);

    if (!user) {
      throw new NotFoundError('Account not found');
    }

    await this.addFavoriteContactRepository.addFavorite(accountId, contactId);
  }
}
