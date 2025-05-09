import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadConversationById {
  loadById (groupId: string): Promise<Conversation>;
}
