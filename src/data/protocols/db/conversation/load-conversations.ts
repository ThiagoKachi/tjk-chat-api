import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadConversationsRepository {
  loadAll (userId: string): Promise<Conversation[]>
}
