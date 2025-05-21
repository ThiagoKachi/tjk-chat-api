import { Message } from '@domain/models/message/message';

export interface LoadMessagesByConversation {
  logMessagesByConversation (
    userId: string,
    conversationId: string
  ): Promise<Message[]>;
}
