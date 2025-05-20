import { Attachment, ReadReceipt } from './message';

export interface ICreateMessage {
  conversationId: string;
  sender: string;
  content: string;
  type: 'text' | 'image' | 'file';
  readBy: ReadReceipt[];
  attachments?: Attachment[];
  deleted: boolean;
}
