import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { CreateDirectConversationRepository } from '@data/protocols/db/conversation/create-direct-conversation';
import { LoadDirectConversationRepository } from '@data/protocols/db/conversation/load-direct-conversation';
import { CreateDirectMessageRepository } from '@data/protocols/db/message/create-direct-message';
import { ICreateMessage } from '@domain/models/message/create-message';
import { CreateDirectMessage } from '@domain/usecases/message/create-direct-message';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbCreateDirectMessage implements CreateDirectMessage {
  constructor (
    private readonly createDirectMessageRepository: CreateDirectMessageRepository,
    private readonly loadDirectConversationRepository: LoadDirectConversationRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly createDirectConversationRepository: CreateDirectConversationRepository
  ) {}

  async create(
    userId: string,
    contactId: string,
    messageData: ICreateMessage
  ): Promise<{ id: string }> {
    const user = await this.loadAccountByIdRepository.loadById(contactId);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const conversationAlreadyExists = await this.loadDirectConversationRepository.load([userId, contactId]);

    if (conversationAlreadyExists) {
      await this.createDirectMessageRepository.create(
        userId,
        conversationAlreadyExists.id,
        messageData
      );

      return { id: conversationAlreadyExists.id };
    }

    const directConversation = await this.createDirectConversationRepository
      .create(userId, { participants: [contactId] });

    await this.createDirectMessageRepository.create(
      userId,
      directConversation.id,
      messageData
    );

    return { id: directConversation.id };
  }
}
