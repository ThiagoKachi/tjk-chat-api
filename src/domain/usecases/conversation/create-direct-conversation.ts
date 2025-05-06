import { ICreateDirectConversation } from '@domain/models/conversation/create-direct-conversation';

export interface CreateDirectConversation {
  create (userId: string, conversationData: ICreateDirectConversation): Promise<{
    id: string
  }>
}
