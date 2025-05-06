export interface Conversation {
  id: string;
  type: 'direct' | 'group';
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
