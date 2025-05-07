import { LoadDirectConversationRepository } from '@data/protocols/db/conversation/load-direct-conversation';
import { Conversation } from '@domain/models/conversation/conversation';
import { LoadDirectConversation } from '@domain/usecases/conversation/load-direct-conversation';

export class DbLoadDirectConversation implements LoadDirectConversation {
  constructor (
    private readonly loadDirectConversationRepository: LoadDirectConversationRepository,
  ) {}

  async load(users: string[]): Promise<Conversation | null> {
    const conversation = await this.loadDirectConversationRepository.load(users);

    return conversation;
  }
}
