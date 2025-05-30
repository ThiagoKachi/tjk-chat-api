import { ICreateMessage } from '@domain/models/message/create-message';

export interface CreateDirectMessage {
  create (
    userId: string,
    contactId: string,
    messageData: ICreateMessage
  ): Promise<{ id: string }>;
}
