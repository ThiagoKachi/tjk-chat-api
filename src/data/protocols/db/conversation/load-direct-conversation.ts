import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadDirectConversationRepository {
  load (users: string[]): Promise<Conversation | null>
}
