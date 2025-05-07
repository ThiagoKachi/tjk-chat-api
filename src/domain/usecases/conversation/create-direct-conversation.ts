import { ICreateConversation } from '@domain/models/conversation/create-conversation';

export interface CreateDirectConversation {
  create (userId: string, conversationData: ICreateConversation): Promise<{
    id: string
  }>
}
