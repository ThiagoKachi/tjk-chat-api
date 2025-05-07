import { CreateDirectConversationRepository } from '@data/protocols/db/conversation/create-direct-conversation';
import { CreateGroupConversationRepository } from '@data/protocols/db/conversation/create-group-conversation';
import { LoadConversationByNameRepository } from '@data/protocols/db/conversation/load-conversation-by-name';
import { LoadConversationsRepository } from '@data/protocols/db/conversation/load-conversations';
import { LoadDirectConversationRepository } from '@data/protocols/db/conversation/load-direct-conversation';
import { Conversation, ConversationType } from '@domain/models/conversation/conversation';
import { ICreateConversation } from '@domain/models/conversation/create-conversation';
import mongoose from 'mongoose';
import { ConversationModel } from '../schemas/conversation-schema';

export class ConversationMongoRepository implements CreateDirectConversationRepository, LoadDirectConversationRepository, LoadConversationsRepository, CreateGroupConversationRepository, LoadConversationByNameRepository {
  async loadByName(groupName: string): Promise<Conversation> {
    const conversation = await ConversationModel.findOne({
      name: { $eq: groupName },
    });

    return conversation && conversation.toObject({
      transform: (_: any, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    });
  }

  async createGroup(userId: string, conversationData: ICreateConversation): Promise<Conversation> {
    const newGroupConversation = new ConversationModel({
      createdBy: userId,
      participants: [userId, ...conversationData.participants],
      type: ConversationType.GROUP,
      name: conversationData.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedConversation = await newGroupConversation.save();

    return savedConversation;
  }

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
      type: ConversationType.DIRECT,
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

  async create(userId: string, conversationData: ICreateConversation): Promise<Conversation> {
    const newConversation = new ConversationModel({
      createdBy: userId,
      participants: [userId, ...conversationData.participants],
      type: ConversationType.DIRECT,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(conversationData.name && { name: conversationData.name }),
    });

    const savedConversation = await newConversation.save();

    return savedConversation;
  }
}
