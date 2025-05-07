import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { CreateDirectConversationRepository } from '@data/protocols/db/conversation/create-direct-conversation';
import { LoadDirectConversationRepository } from '@data/protocols/db/conversation/load-direct-conversation';
import { ICreateConversation } from '@domain/models/conversation/create-conversation';
import { CreateDirectConversation } from '@domain/usecases/conversation/create-direct-conversation';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbCreateDirectConversation implements CreateDirectConversation {
  constructor (
    private readonly createDirectConversationRepository: CreateDirectConversationRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadDirectConversationRepository: LoadDirectConversationRepository,
  ) {}

  async create(userId: string, conversationData: ICreateConversation): Promise<{
    id: string
  }> {
    const userExists = await this.loadAccountByIdRepository.loadById(conversationData.participants[0]);

    if (!userExists) {
      throw new NotFoundError('User not found');
    }

    const conversationExists = await this.loadDirectConversationRepository.load([userId, conversationData.participants[0]]);

    if (conversationExists) {
      return { id: conversationExists.id };
    }

    const conversation = await this.createDirectConversationRepository.create(userId, conversationData);

    return { id: conversation.id };
  }
}
