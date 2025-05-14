import { Attachment, ReadReceipt } from './message';

export interface ICreateDirectMessage {
  conversationId: string;
  sender: string;
  content: string;
  type: 'text' | 'image' | 'file';
  readBy: ReadReceipt[];
  attachments?: Attachment[];
  deleted: boolean;
}
