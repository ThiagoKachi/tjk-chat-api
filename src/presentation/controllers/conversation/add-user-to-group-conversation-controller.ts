import { AddUserToGroupConversation } from '@domain/usecases/conversation/add-user-to-group-conversation';
import { badRequest, noContent } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { AddUserToGroupConversationValidator } from '@validation/validators/conversation/add-user-to-group-conversation-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class AddUserToGroupConversationController implements Controller {
  constructor (
    private readonly addUserToGroupConversation: AddUserToGroupConversation,
    private readonly validation: AddUserToGroupConversationValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const body = httpRequest.body;
      const { accountId } = httpRequest;

      await this.addUserToGroupConversation
        .addToGroup(accountId!, body.conversationId, body.userIds);

      return noContent();
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
