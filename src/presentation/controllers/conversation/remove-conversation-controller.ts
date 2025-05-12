import { RemoveConversation } from '@domain/usecases/conversation/remove-conversation';
import { badRequest, noContent } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { RemoveConversationValidator } from '@validation/validators/conversation/remove-conversation-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class RemoveConversationController implements Controller {
  constructor (
    private readonly removeConversation: RemoveConversation,
    private readonly validation: RemoveConversationValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const { conversationId } = httpRequest.params;
      const { accountId } = httpRequest;

      await this.removeConversation.remove(accountId!, conversationId);

      return noContent();
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
