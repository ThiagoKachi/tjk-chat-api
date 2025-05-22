export interface RemoveMessage {
  remove (userId: string, messageId: string): Promise<void>;
}
