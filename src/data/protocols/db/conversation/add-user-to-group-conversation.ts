export interface AddUserToGroupConversationRepository {
  addToGroup (conversationId: string, userIds: string[]): Promise<void>
}
