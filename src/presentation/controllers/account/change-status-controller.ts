import { ChangeStatus } from '@domain/usecases/account/change-status';
import { badRequest, noContent } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { ChangeStatusValidator } from '@validation/validators/account/change-status-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class ChangeStatusController implements Controller {
  constructor (
    private readonly changeStatus: ChangeStatus,
    private readonly validation: ChangeStatusValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const body = httpRequest.body;
      const accountId = httpRequest.accountId;

      await this.changeStatus.change(accountId!, body.status);

      return noContent();
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
