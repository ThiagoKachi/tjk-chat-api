export interface RemoveConversation {
  remove (userId: string, conversationId: string): Promise<void>;
}
