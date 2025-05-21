import { LoadConversationByIdRepository } from '@data/protocols/db/conversation/load-conversation-by-id';
import { LoadMessagesByConversationRepository } from '@data/protocols/db/message/load-messages-by-conversation';
import { Message } from '@domain/models/message/message';
import { LoadMessagesByConversation } from '@domain/usecases/message/load-message-by-conversation';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbLoadMessagesByConversation implements LoadMessagesByConversation {
  constructor (
    private readonly loadMessagesByConversationRepository: LoadMessagesByConversationRepository,
    private readonly loadConversationByIdRepository: LoadConversationByIdRepository
  ) {}
  async logMessagesByConversation(
    userId: string,
    conversationId: string,
    pageSize: number,
    offset: number
  ): Promise<Message[]> {
    const conversation = await this.loadConversationByIdRepository
      .loadById(conversationId);

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const isUserInConversation = conversation.participants
      .some(participant => participant === userId);

    if (!isUserInConversation) {
      throw new NotFoundError('User not found in conversation');
    }

    const messages = await this.loadMessagesByConversationRepository
      .logMessagesByConversation(conversationId, pageSize, offset);

    return messages;
  }
}
