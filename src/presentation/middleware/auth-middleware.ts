import { Decrypter } from '@data/protocols/criptography/decrypter';
import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { UnauthorizedError } from '@presentation/errors/unauthorized';
import { forbidden, ok, serverError } from '@presentation/helpers/http/http-helper';
import { HttpRequest, HttpResponse, Middleware } from '@presentation/protocols';

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountById: LoadAccountByIdRepository,
    private readonly decrypter: Decrypter
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['authorization'];

      if (accessToken) {
        const token = accessToken.split(' ')[1];
        let decryptedToken;
        try {
          decryptedToken = await this.decrypter.decrypt(token);
        } catch (_error) {
          return forbidden(new UnauthorizedError('Invalid token'));
        }

        if (!decryptedToken.id) {
          return forbidden(new UnauthorizedError('Invalid token'));
        }

        const account = await this.loadAccountById.loadById(decryptedToken.id);
        if (account) {
          return ok({ accountId: account.id });
        }
      }

      return forbidden(new UnauthorizedError('Invalid token'));
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
