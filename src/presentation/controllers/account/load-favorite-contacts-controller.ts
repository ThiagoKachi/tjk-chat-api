import { LoadFavoriteContacts } from '@domain/usecases/account/load-favorite-contacts';
import { ok } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { handleError } from 'src/utils/error-handler';

export class LoadFavoriteContactsController implements Controller {
  constructor (
    private readonly loadFavoriteContacts: LoadFavoriteContacts,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest;

      const favorites = await this.loadFavoriteContacts.loadFavorites(accountId!);

      return ok(favorites);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
