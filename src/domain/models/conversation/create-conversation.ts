import { ConversationType } from './conversation';

export interface ICreateConversation {
  type: ConversationType;
  name?: string;
  participants: string[];
}
