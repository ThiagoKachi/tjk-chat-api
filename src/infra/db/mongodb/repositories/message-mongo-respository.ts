import { CreateDirectMessageRepository } from '@data/protocols/db/message/create-direct-message';
import { CreateGroupMessageRepository } from '@data/protocols/db/message/create-group-message';
import { ICreateMessage } from '@domain/models/message/create-message';
import { Message } from '@domain/models/message/message';
import { MessageModel } from '../schemas/message-schema';

export class MessageMongoRepository implements CreateDirectMessageRepository, CreateGroupMessageRepository {
  async groupMessage(
    userId: string,
    groupId: string,
    messageData: ICreateMessage
  ): Promise<Message> {
    const message = await MessageModel.create({
      ...messageData,
      sender: userId,
      conversationId: groupId,
      type: 'text',
      deleted: false,
      readBy: [],
    });

    return message;
  }

  async create(
    userId: string,
    conversationId: string,
    messageData: ICreateMessage
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
