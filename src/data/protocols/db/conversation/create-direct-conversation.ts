import { Conversation } from '@domain/models/conversation/conversation';
import { ICreateDirectConversation } from '@domain/models/conversation/create-direct-conversation';

export interface CreateDirectConversationRepository {
  create (userId: string, conversationData: ICreateDirectConversation): Promise<Conversation>
}
