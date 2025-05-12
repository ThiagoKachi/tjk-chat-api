import { LoadConversationsRepository } from '@data/protocols/db/conversation/load-conversations';
import { Conversation } from '@domain/models/conversation/conversation';
import { LoadConversations } from '@domain/usecases/conversation/load-conversations';

export class DbLoadConversations implements LoadConversations {
  constructor (
    private readonly loadConversationsRepository: LoadConversationsRepository,
  ) {}

  async loadAll(userId: string, groupName?: string): Promise<Conversation[]> {
    const conversations = await this.loadConversationsRepository
      .loadAll(userId, groupName);

    return conversations;
  }
}
