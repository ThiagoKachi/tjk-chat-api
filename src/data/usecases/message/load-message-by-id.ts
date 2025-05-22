import { LoadMessageByIdRepository } from '@data/protocols/db/message/load-message-by-id';
import { Message } from '@domain/models/message/message';
import { LoadMessageById } from '@domain/usecases/message/load-message-by-id';

export class DbLoadMessageById implements LoadMessageById {
  constructor (
    private readonly loadMessageByIdRepository: LoadMessageByIdRepository,
  ) {}

  async loadById(messageId: string): Promise<Message | null> {
    return await this.loadMessageByIdRepository.loadById(messageId);
  }
}
