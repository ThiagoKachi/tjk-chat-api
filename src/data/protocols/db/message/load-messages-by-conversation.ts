import { Message } from '@domain/models/message/message';

export interface LoadMessagesByConversationRepository {
  logMessagesByConversation (conversationId: string): Promise<Message[]>;
}
