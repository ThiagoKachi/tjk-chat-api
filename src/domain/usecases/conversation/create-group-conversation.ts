import { ICreateConversation } from '@domain/models/conversation/create-conversation';

export interface CreateGroupConversation {
  createGroup (userId: string, conversationData: ICreateConversation): Promise<{
    id: string
  }>
}
