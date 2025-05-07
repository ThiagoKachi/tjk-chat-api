import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadConversationByName {
  loadByName (groupName: string): Promise<Conversation>;
}
