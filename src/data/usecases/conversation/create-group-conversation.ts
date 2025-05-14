import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { CreateGroupConversationRepository } from '@data/protocols/db/conversation/create-group-conversation';
import { LoadConversationByNameRepository } from '@data/protocols/db/conversation/load-conversation-by-name';
import { ICreateConversation } from '@domain/models/conversation/create-conversation';
import { CreateGroupConversation } from '@domain/usecases/conversation/create-group-conversation';
import { ConflictError } from '@presentation/errors/conflict-error';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbCreateGroupConversation implements CreateGroupConversation {
  constructor (
    private readonly createGroupConversationRepository: CreateGroupConversationRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadConversationByNameRepository: LoadConversationByNameRepository,
  ) {}

  async createGroup(userId: string, conversationData: ICreateConversation): Promise<{
    id: string
  }> {
    for (const participant of conversationData.participants) {
      const userExists = await this.loadAccountByIdRepository.loadById(participant);

      if (!userExists) {
        throw new NotFoundError(`User with ID: ${participant} not found`);
      }
    }

    const conversationExists = await this.loadConversationByNameRepository.loadByName(conversationData.name!);

    if (conversationExists) {
      throw new ConflictError(`Group with name "${conversationData.name}" already exists.`);
    }

    const conversation = await this.createGroupConversationRepository.createGroup(userId, conversationData);

    return { id: conversation.id };
  }
}
