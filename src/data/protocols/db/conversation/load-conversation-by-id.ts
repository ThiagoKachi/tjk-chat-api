import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadConversationByIdRepository {
  loadById (groupId: string): Promise<Conversation>
}
