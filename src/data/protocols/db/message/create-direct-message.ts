import { ICreateDirectMessage } from '@domain/models/message/create-direct-message';
import { Message } from '@domain/models/message/message';

export interface CreateDirectMessageRepository {
  create (
    userId: string,
    conversationId: string,
    messageData: ICreateDirectMessage
  ): Promise<Message>;
}
