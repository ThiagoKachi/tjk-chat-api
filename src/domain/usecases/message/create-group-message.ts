import { ICreateMessage } from '@domain/models/message/create-message';

export interface CreateGroupMessage {
  groupMessage (
    userId: string,
    groupId: string,
    messageData: ICreateMessage
  ): Promise<{ id: string }>;
}
