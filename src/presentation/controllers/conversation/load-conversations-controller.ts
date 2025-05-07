import { LoadConversations } from '@domain/usecases/conversation/load-conversations';
import { created } from '@presentation/helpers/http/http-helper';
import { Controller, HttpRequest, HttpResponse } from '@presentation/protocols';
import { handleError } from 'src/utils/error-handler';

export class LoadConversationsController implements Controller {
  constructor (
    private readonly loadConversations: LoadConversations,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = httpRequest;

      const account = await this.loadConversations.loadAll(accountId!);

      return created(account);
    } catch (error) {
      return handleError(error as Error);
    }
  }
}
