import { CreateGroupMessage } from '@domain/usecases/message/create-group-message';
import { badRequest, created } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { CreateGroupMessageValidator } from '@validation/validators/message/create-group-message-validation';
import { handleError } from 'src/utils/error-handler';
import { ValidationErrorAdapter } from 'src/utils/zod-error-adapter';

export class CreateGroupMessageController implements Controller {
  constructor (
    private readonly createGroupMessage: CreateGroupMessage,
    private readonly validation: CreateGroupMessageValidator,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error && !error.success && error.error.issues) {
        return badRequest(ValidationErrorAdapter.convert(error.error.issues));
      }

      const body = httpRequest.body;
      const { accountId } = httpRequest;

      const message = await this.createGroupMessage.groupMessage(
        accountId!,
        body.groupId,
        body
      );

      return created(message);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
