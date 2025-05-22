import { RemoveMessage } from '@domain/usecases/message/remove-message';
import { badRequest, noContent } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { RemoveMessageValidator } from '@validation/validators/message/remove-message-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class RemoveMessageController implements Controller {
  constructor (
    private readonly removeMessage: RemoveMessage,
    private readonly validation: RemoveMessageValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { messageId } = httpRequest.params;

      const error = this.validation.validate(messageId);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const { accountId } = httpRequest;

      await this.removeMessage.remove(accountId!, messageId);

      return noContent();
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
