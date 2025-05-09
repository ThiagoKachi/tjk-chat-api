import { LoadConversationByIdRepository } from '@data/protocols/db/conversation/load-conversation-by-id';
import { Conversation } from '@domain/models/conversation/conversation';
import { LoadConversationById } from '@domain/usecases/conversation/load-conversation-by-id';

export class DbLoadConversationById implements LoadConversationById {
  constructor (
    private readonly loadConversationByIdRepository: LoadConversationByIdRepository,
  ) {}

  async loadById(groupId: string): Promise<Conversation> {
    const group = await this.loadConversationByIdRepository.loadById(groupId);

    return group;
  }
}
