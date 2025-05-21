import { LoadMessagesByConversation } from '@domain/usecases/message/load-message-by-conversation';
import { badRequest, ok } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { LoadMessagesByConversationValidator } from '@validation/validators/message/load-messages-by-conversation-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class LoadMessagesByConversationController implements Controller {
  constructor (
    private readonly loadMessagesByConversation: LoadMessagesByConversation,
    private readonly validation: LoadMessagesByConversationValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const params = httpRequest.params;
      const { accountId } = httpRequest;

      const messages = await this.loadMessagesByConversation
        .logMessagesByConversation(accountId!, params.conversationId);

      return ok(messages);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
