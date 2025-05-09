export interface AddUserToGroupConversation {
  addToGroup (userId: string, conversationId: string, userIds: string[]): Promise<void>
}
