import { ICreateDirectMessage } from '@domain/models/message/create-direct-message';

export interface CreateDirectMessage {
  create (
    userId: string,
    contactId: string,
    messageData: ICreateDirectMessage
  ): Promise<{ id: string }>;
}
