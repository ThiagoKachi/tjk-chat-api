import { Message } from '@domain/models/message/message';

export interface LoadMessageById {
  loadById (messageId: string): Promise<Message | null>;
}
