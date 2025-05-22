import { LoadMessageByIdRepository } from '@data/protocols/db/message/load-message-by-id';
import { RemoveMessageRepository } from '@data/protocols/db/message/remove-message';
import { RemoveMessage } from '@domain/usecases/message/remove-message';
import { ConflictError } from '@presentation/errors/conflict-error';
import { NotFoundError } from '@presentation/errors/not-found';
import { UnauthorizedError } from '@presentation/errors/unauthorized';

export class DbRemoveMessage implements RemoveMessage {
  constructor (
    private readonly removeMessageRepository: RemoveMessageRepository,
    private readonly loadMessageByIdRepository: LoadMessageByIdRepository,
  ) {}
  async remove(userId: string, messageId: string): Promise<void> {
    const message = await this.loadMessageByIdRepository.loadById(messageId);

    if (!message) {
      throw new NotFoundError('Message not found');
    }

    if (message.sender !== userId) {
      throw new UnauthorizedError('User is not the owner of the message');
    }

    if (message.deleted === true) {
      throw new ConflictError('Message already removed');
    }

    await this.removeMessageRepository.remove(messageId);
  }
}
