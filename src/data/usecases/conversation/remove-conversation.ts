import { LoadConversationByIdRepository } from '@data/protocols/db/conversation/load-conversation-by-id';
import { RemoveConversationRepository } from '@data/protocols/db/conversation/remove-conversation';
import { RemoveConversation } from '@domain/usecases/conversation/remove-conversation';
import { NotFoundError } from '@presentation/errors/not-found';
import { UnauthorizedError } from '@presentation/errors/unauthorized';

export class DbRemoveConversation implements RemoveConversation {
  constructor (
    private readonly loadConversationByIdRepository: LoadConversationByIdRepository,
    private readonly removeConversationRepository: RemoveConversationRepository
  ) {}

  async remove(userId: string, conversationId: string): Promise<void> {
    const conversation = await this.loadConversationByIdRepository.loadById(conversationId);

    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const userIsAdmin = conversation.admin.some(adminId => adminId === userId);

    if (!userIsAdmin) {
      throw new UnauthorizedError('User not allowed to remove this conversation');
    }

    await this.removeConversationRepository.remove(conversationId);
  }
}
