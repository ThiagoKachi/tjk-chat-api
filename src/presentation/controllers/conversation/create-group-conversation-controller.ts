import { CreateGroupConversation } from '@domain/usecases/conversation/create-group-conversation';
import { badRequest, created } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { CreateConversationValidator } from '@validation/validators/conversation/create-conversation-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class CreateGroupConversationController implements Controller {
  constructor (
    private readonly createGroupConversation: CreateGroupConversation,
    private readonly validation: CreateConversationValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const body = httpRequest.body;
      const { accountId } = httpRequest;

      const account = await this.createGroupConversation.createGroup(accountId!, body);

      return created(account);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
