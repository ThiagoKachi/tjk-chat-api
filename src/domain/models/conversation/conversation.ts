export enum ConversationType {
  DIRECT = 'direct',
  GROUP = 'group'
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name?: string;
  participants: string[];
  createdBy: string;
  lastMessage?: {
    content: string;
    sender: string;
    timestamp: Date;
  };
  unreadCounts?: Record<string, number>;
  createdAt?: Date;
  updatedAt?: Date;
}
