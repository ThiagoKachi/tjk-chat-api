import { Message } from '@domain/models/message/message';

export interface LoadMessagesByConversationRepository {
  logMessagesByConversation (
    conversationId: string,
    pageSize: number,
    offset: number
  ): Promise<Message[]>;
}
