export interface ICreateDirectConversation {
  type: 'direct' | 'group';
  name?: string;
  participants: string[];
}
