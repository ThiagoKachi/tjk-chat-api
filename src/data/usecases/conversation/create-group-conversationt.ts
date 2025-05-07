import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { CreateGroupConversationRepository } from '@data/protocols/db/conversation/create-group-conversation';
import { ICreateConversation } from '@domain/models/conversation/create-conversation';
import { CreateGroupConversation } from '@domain/usecases/conversation/create-group-conversation';
import { NotFoundError } from '@presentation/errors/not-found';

export class DbCreateGroupConversation implements CreateGroupConversation {
  constructor (
    private readonly createGroupConversationRepository: CreateGroupConversationRepository,
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
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

    // Busca pelo nome
    // const conversationExists = await this.loadDirectConversationRepository.load([userId, conversationData.participants[0]]);

    // if (conversationExists) {
    //   return { id: conversationExists.id };
    // }

    const conversation = await this.createGroupConversationRepository.createGroup(userId, conversationData);

    return { id: conversation.id };
  }
}
