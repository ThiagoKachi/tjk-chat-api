import { Authentication } from '@domain/usecases/account/authentication';
import { badRequest, created } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { AuthenticationValidator } from '@validation/validators/account/authentication-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class AuthenticationController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: AuthenticationValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const body = httpRequest.body;

      const token = await this.authentication.auth(body);

      return created(token);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
