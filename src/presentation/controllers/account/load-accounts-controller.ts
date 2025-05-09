import { LoadAccounts } from '@domain/usecases/account/load-accounts';
import { badRequest, ok } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { LoadAccountsValidator } from '@validation/validators/account/load-accounts-validation';
import { handleError } from 'src/utils/error-handler';
import { transformStringToBoolean } from 'src/utils/transform-string-to-boolean';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class LoadAccountsController implements Controller {
  constructor (
    private readonly loadAccounts: LoadAccounts,
    private readonly validation: LoadAccountsValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const { conversationId, inGroup } = httpRequest.query;

      const inGroupBoolean = transformStringToBoolean(inGroup);

      const accounts = await this.loadAccounts.load({ conversationId, inGroup: inGroupBoolean });

      return ok(accounts);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
