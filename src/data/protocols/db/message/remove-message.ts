export interface RemoveMessageRepository {
  remove (messageId: string): Promise<void>;
}
