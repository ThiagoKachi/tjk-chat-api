import { LoadAccounts } from '@domain/usecases/account/load-accounts';
import { ok } from '@presentation/helpers/http/http-helper';
import { Controller, HttpResponse } from '@presentation/protocols';
import { handleError } from 'src/utils/error-handler';

export class LoadAccountsController implements Controller {
  constructor (
    private readonly loadAccounts: LoadAccounts,
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const accounts = await this.loadAccounts.load();

      return ok(accounts);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
