export interface RemoveConversationRepository {
  remove (conversationId: string): Promise<void>;
}
