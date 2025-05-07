import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadConversations {
  loadAll (userId: string): Promise<Conversation[]>;
}
