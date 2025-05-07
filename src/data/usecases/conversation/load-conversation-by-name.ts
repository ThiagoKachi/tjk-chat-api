import { LoadConversationByNameRepository } from '@data/protocols/db/conversation/load-conversation-by-name';
import { Conversation } from '@domain/models/conversation/conversation';
import { LoadConversationByName } from '@domain/usecases/conversation/load-conversation-by-name';

export class DbLoadConversationByName implements LoadConversationByName {
  constructor (
    private readonly loadConversationByNameRepository: LoadConversationByNameRepository,
  ) {}

  async loadByName(groupName: string): Promise<Conversation> {
    const conversation = await this.loadConversationByNameRepository.loadByName(groupName);

    return conversation;
  }
}
