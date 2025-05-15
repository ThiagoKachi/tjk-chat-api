import { CreateDirectMessageRepository } from '@data/protocols/db/message/create-direct-message';
import { ICreateDirectMessage } from '@domain/models/message/create-direct-message';
import { Message } from '@domain/models/message/message';
import { MessageModel } from '../schemas/message-schema';

export class MessageMongoRepository implements CreateDirectMessageRepository {
  async create(
    userId: string,
    conversationId: string,
    messageData: ICreateDirectMessage
  ): Promise<Message> {
    const message = await MessageModel.create({
      ...messageData,
      sender: userId,
      conversationId,
      type: 'text',
      deleted: false,
      readBy: [],
    });

    return message;
  }

}
