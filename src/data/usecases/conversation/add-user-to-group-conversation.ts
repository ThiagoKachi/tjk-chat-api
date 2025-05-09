import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { AddUserToGroupConversationRepository } from '@data/protocols/db/conversation/add-user-to-group-conversation';
import { LoadConversationByIdRepository } from '@data/protocols/db/conversation/load-conversation-by-id';
import { AddUserToGroupConversation } from '@domain/usecases/conversation/add-user-to-group-conversation';
import { NotFoundError } from '@presentation/errors/not-found';
import { UnauthorizedError } from '@presentation/errors/unauthorized';

export class DbAddUserToGroupConversation implements AddUserToGroupConversation {
  constructor (
    private readonly addUserToGroupConversationRepository: AddUserToGroupConversationRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadConversationByIdRepository: LoadConversationByIdRepository,
  ) {}

  async addToGroup(userId: string, conversationId: string, userIds: string[]): Promise<void> {
    for (const participant of userIds) {
      const userExists = await this.loadAccountByIdRepository.loadById(participant);

      if (!userExists) {
        throw new NotFoundError(`User with ID: ${participant} not found`);
      }
    }

    const conversation = await this.loadConversationByIdRepository.loadById(conversationId);

    if (!conversation) {
      throw new NotFoundError('Group do not exists.');
    }

    const isGroup = conversation.type === 'group';

    if (!isGroup) {
      throw new NotFoundError('Not allowed to add users to a direct conversation.');
    }

    const userIsAdmin = conversation.admin.find((participant) => participant === userId);

    if (!userIsAdmin) {
      throw new UnauthorizedError('You are not an admin of this group.');
    }

    await this.addUserToGroupConversationRepository.addToGroup(conversationId, userIds);
  }
}
