import { CreateDirectMessageRepository } from '@data/protocols/db/message/create-direct-message';
import { CreateGroupMessageRepository } from '@data/protocols/db/message/create-group-message';
import { LoadMessageByIdRepository } from '@data/protocols/db/message/load-message-by-id';
import { LoadMessagesByConversationRepository } from '@data/protocols/db/message/load-messages-by-conversation';
import { RemoveMessageRepository } from '@data/protocols/db/message/remove-message';
import { ICreateMessage } from '@domain/models/message/create-message';
import { Message } from '@domain/models/message/message';
import { MessageModel } from '../schemas/message-schema';

export class MessageMongoRepository implements CreateDirectMessageRepository, CreateGroupMessageRepository, LoadMessagesByConversationRepository, LoadMessageByIdRepository, RemoveMessageRepository {
  async remove(messageId: string): Promise<void> {
    await MessageModel.findByIdAndUpdate(messageId, {
      deleted: true,
      updatedAt: new Date(),
    });
  }

  async loadById(messageId: string): Promise<Message | null> {
    const message = await MessageModel.findById(messageId);
    return message.toObject({
      transform: (_: any, ret: any) => {
        ret.id = ret._id.toString();
        ret.sender = ret.sender.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  async logMessagesByConversation(
    conversationId: string,
    pageSize: number,
    offset: number
  ): Promise<Message[]> {
    const messages = await MessageModel
      .find({ conversationId, deleted: false })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(pageSize);

    return messages;
  }

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
