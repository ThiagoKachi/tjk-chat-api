import { Conversation } from '@domain/models/conversation/conversation';

export interface LoadDirectConversation {
  load (users: string[]): Promise<Conversation | null>;
}
