import { CreateAccount } from '@domain/usecases/account/auth/create-account';
import { badRequest, created } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { CreateAccountValidator } from '@validation/validators/account/auth/create-account-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class CreateAccountController implements Controller {
  constructor (
    private readonly createAccount: CreateAccount,
    private readonly validation: CreateAccountValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const body = httpRequest.body;

      const account = await this.createAccount.create(body);

      return created(account);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
