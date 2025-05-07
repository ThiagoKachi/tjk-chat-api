import { CreateDirectConversationRepository } from '@data/protocols/db/conversation/create-direct-conversation';
import { LoadConversationsRepository } from '@data/protocols/db/conversation/load-conversations';
import { LoadDirectConversationRepository } from '@data/protocols/db/conversation/load-direct-conversation';
import { Conversation } from '@domain/models/conversation/conversation';
import { ICreateDirectConversation } from '@domain/models/conversation/create-direct-conversation';
import mongoose from 'mongoose';
import { ConversationModel } from '../schemas/conversation-schema';

export class ConversationMongoRepository implements CreateDirectConversationRepository, LoadDirectConversationRepository, LoadConversationsRepository {
  async loadAll(userId: string): Promise<Conversation[]> {
    const conversations = await ConversationModel.find({
      participants: { $in: [new mongoose.Types.ObjectId(userId)] },
    }).populate('participants', 'name email')
      .sort({ updatedAt: -1 })
      .exec();

    return conversations.map((conversation) => {
      return conversation.toObject({
        transform: (_: any, ret: any) => {
          ret.id = ret._id.toString();
          delete ret._id;
          delete ret.__v;
          return ret;
        },
      });
    });
  }

  async load(users: string[]): Promise<Conversation | null> {
    const conversation = await ConversationModel.findOne({
      participants: { $all: users },
      type: 'direct',
    });

    return conversation ? conversation.toObject({
      transform: (_: any, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    }) as Conversation : null;
  }

  async create(userId: string, conversationData: ICreateDirectConversation): Promise<Conversation> {
    const newConversation = new ConversationModel({
      createdBy: userId,
      participants: [userId, ...conversationData.participants],
      type: conversationData.type,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(conversationData.name && { name: conversationData.name }),
    });

    const savedConversation = await newConversation.save();

    return savedConversation;
  }
}
