import { CreateDirectMessage } from '@domain/usecases/message/create-direct-message';
import { badRequest, created } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { CreateDirectMessageValidator } from '@validation/validators/message/create-direct-message-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class CreateDirectMessageController implements Controller {
  constructor (
    private readonly createDirectMessage: CreateDirectMessage,
    private readonly validation: CreateDirectMessageValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const body = httpRequest.body;
      const { accountId } = httpRequest;

      const message = await this.createDirectMessage.create(
        accountId!,
        body.contactId,
        body
      );

      return created(message);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
