import { Message } from '@domain/models/message/message';

export interface LoadMessageByIdRepository {
  loadById (messageId: string): Promise<Message | null>;
}
