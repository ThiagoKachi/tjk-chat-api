import { ValidationError } from '@domain/models/validation-error/validation';

export interface AddUserToGroupConversationValidator {
  validate (data: { conversationId: string, userIds: string[] }): void | ValidationError
}
