import { LoadConversationByIdRepository } from '@data/protocols/db/conversation/load-conversation-by-id';
import { CreateGroupMessageRepository } from '@data/protocols/db/message/create-group-message';
import { ICreateMessage } from '@domain/models/message/create-message';
import { CreateGroupMessage } from '@domain/usecases/message/create-group-message';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbCreateGroupMessage implements CreateGroupMessage {
  constructor (
    private readonly createGroupMessageRepository: CreateGroupMessageRepository,
    private readonly loadConversationByIdRepository: LoadConversationByIdRepository,  ) {}

  async groupMessage(
    userId: string,
    groupId: string,
    messageData: ICreateMessage
  ): Promise<{ id: string }> {
    const conversation = await this.loadConversationByIdRepository.loadById(groupId);

    if (!conversation) {
      throw new NotFoundError('Group not found');
    }

    const userBePartOfGroup = conversation.participants.some(
      (participant) => participant === userId
    );

    if (!userBePartOfGroup) {
      throw new NotFoundError('User not part of group');
    }

    const isGroup = conversation.type === 'group';

    if (!isGroup) {
      throw new NotFoundError('Conversation is not a group');
    }

    await this.createGroupMessageRepository.groupMessage(
      userId,
      conversation.id,
      messageData
    );

    return { id: conversation.id };
  }
}
