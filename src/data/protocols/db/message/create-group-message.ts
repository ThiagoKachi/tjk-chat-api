import { ICreateMessage } from '@domain/models/message/create-message';
import { Message } from '@domain/models/message/message';

export interface CreateGroupMessageRepository {
  groupMessage (
    userId: string,
    groupId: string,
    messageData: ICreateMessage
  ): Promise<Message>;
}
