import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadConversations {
  loadAll (userId: string, groupName?: string): Promise<Conversation[]>;
}
