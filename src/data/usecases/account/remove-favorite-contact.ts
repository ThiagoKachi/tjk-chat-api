import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { RemoveFavoriteContactRepository } from '@data/protocols/db/account/remove-favorite-contact';
import { RemoveFavoriteContact } from '@domain/usecases/account/remove-favorite-contact';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbRemoveFavoriteContact implements RemoveFavoriteContact {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly removeFavoriteContactRepository: RemoveFavoriteContactRepository,
  ) {}

  async removeFavorite(accountId: string, contactId: string): Promise<void> {
    const user = await this.loadAccountByIdRepository.loadById(contactId);

    if (!user) {
      throw new NotFoundError('Account not found');
    }

    // Se não tiver nos favoritos, retorna mensagem de erro

    await this.removeFavoriteContactRepository.removeFavorite(accountId, contactId);
  }
}
