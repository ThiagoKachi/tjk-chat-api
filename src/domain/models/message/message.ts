export interface Attachment {
  url: string;
  type: string;
  name: string;
  size: number;
}

export interface ReadReceipt {
  userId: string;
  readAt: Date;
}

export interface Message {
  id?: string;
  conversationId: string;
  sender: string;
  content: string;
  type: 'text' | 'image' | 'file';
  readBy: ReadReceipt[];
  attachments?: Attachment[];
  deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}