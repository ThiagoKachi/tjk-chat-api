import { ICreateMessage } from '@domain/models/message/create-message';
import { Message } from '@domain/models/message/message';

export interface CreateDirectMessageRepository {
  create (
    userId: string,
    conversationId: string,
    messageData: ICreateMessage
  ): Promise<Message>;
}
