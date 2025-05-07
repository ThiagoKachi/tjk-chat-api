import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadConversationByNameRepository {
  loadByName (groupName: string): Promise<Conversation>
}
